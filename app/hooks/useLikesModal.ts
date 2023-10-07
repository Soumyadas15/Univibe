import { create } from 'zustand';

interface LikesModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLikesModal = create<LikesModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useLikesModal;