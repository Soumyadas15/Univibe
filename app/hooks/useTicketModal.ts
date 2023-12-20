import { create } from 'zustand';

interface TicketModalSTore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTicketModal = create<TicketModalSTore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useTicketModal;