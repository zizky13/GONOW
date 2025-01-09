import { create } from 'zustand';

interface ModalState {
    visible: boolean;
    modalType: 'time' | 'location' | null;
    showModal: (type: 'time' | 'location') => void;
    hideModal: () => void;
}

interface NotificationModalState {
    visibleNotification: boolean;
    showNotificationModal: () => void;
    hideNotificationModal: () => void;
}

const useModalState = create<ModalState>((set) => ({
    visible: false,
    modalType: null,
    showModal: (type) => set({ visible: true, modalType: type }),
    hideModal: () => set({ visible: false, modalType: null }),
}));

const useNotificationModalState = create<NotificationModalState>((set) => ({
    visibleNotification: false,
    showNotificationModal: () => set({ visibleNotification: true }),
    hideNotificationModal: () => set({ visibleNotification: false}),
}));

export { useModalState, useNotificationModalState };