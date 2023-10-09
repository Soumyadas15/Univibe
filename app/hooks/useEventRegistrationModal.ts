import { create } from 'zustand';

interface EventRegistrationStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEventRegistrationModal = create<EventRegistrationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useEventRegistrationModal;