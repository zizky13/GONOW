import { create } from 'zustand';

interface ModalState {
    visible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

interface NotificationModalState {
    visibleNotification: boolean;
    showNotificationModal: () => void;
    hideNotificationModal: () => void;
}

const useModalState = create<ModalState>((set) => ({
    visible: false,
    showModal: () => set({ visible: true }),
    hideModal: () => set({ visible: false }),
}));

const useNotificationModalState = create<NotificationModalState>((set) => ({
    visibleNotification: false,
    showNotificationModal: () => set({ visibleNotification: true }),
    hideNotificationModal: () => set({ visibleNotification: false}),
}));

export { useModalState, useNotificationModalState };