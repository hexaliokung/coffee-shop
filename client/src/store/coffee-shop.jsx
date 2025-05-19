import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockUsers, generateMockToken } from '../data/mockUsers';
import { config } from '../config';

const coffeeShopStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    try {
      if (config.useMockData) {
        // Use mock authentication
        const user = mockUsers.find(u => u.email === form.email && u.password === form.password);
        
        if (!user) {
          throw { response: { data: { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' } } };
        }

        const token = generateMockToken(user);
        const { password, ...userWithoutPassword } = user;

        set({
          user: userWithoutPassword,
          token: token
        });

        return {
          data: {
            message: 'เข้าสู่ระบบสำเร็จ (Mock)',
            token: token,
            payload: userWithoutPassword
          }
        };
      } else {
        // Use real backend
        const res = await axios.post(`${config.apiUrl}/login`, form);
        console.log('Store login response:', res.data);
        
        set({
          user: res.data.payload,
          token: res.data.token
        });
        
        return res;
      }
    } catch (error) {
      console.log('Store login error:', error);
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