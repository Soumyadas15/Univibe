import { create } from 'zustand';

interface IncompleteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useIncompleteModal = create<IncompleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useIncompleteModal;