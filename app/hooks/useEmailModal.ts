import { create } from 'zustand';

interface EmailModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEmailModal = create<EmailModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEmailModal;