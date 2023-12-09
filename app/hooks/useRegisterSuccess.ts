import { create } from 'zustand';

interface RegisterSuccessStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterSuccess = create<RegisterSuccessStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRegisterSuccess;