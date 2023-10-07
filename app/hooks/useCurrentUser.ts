import create from 'zustand';
import { SafeUser } from '../types';

type UserStore = {
  currentUser: SafeUser | null;
  setCurrentUser: (user: SafeUser | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));