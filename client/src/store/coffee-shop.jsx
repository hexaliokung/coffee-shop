import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const coffeeShopStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    try {
      const res = await axios.post('http://localhost:5001/api/login', form);
      console.log('Store login response:', res.data)
      set({
        user: res.data.payload,
        token: res.data.token
      });
      console.log('Store state after login:', {
        user: res.data.payload,
        token: res.data.token
      })
      return res;
    } catch (error) {
      console.log('Store login error:', error)
      throw error;
    }
  }
});

// localStorage
const usePersist = {
  name: 'coffee-shop-storage',
  storage: createJSONStorage(() => localStorage),
};

const useCoffeeShopStore = create(
  persist(coffeeShopStore, usePersist)
);

export default useCoffeeShopStore;