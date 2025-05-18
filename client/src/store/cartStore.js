import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),

      removeItem: (itemId) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId)
      })),

      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const state = useCartStore.getState()
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore