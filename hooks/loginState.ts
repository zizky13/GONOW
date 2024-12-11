import { create } from 'zustand';

interface LoginState {
    isLoggedIn: boolean;
    username: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
}

const useLoginState = create<LoginState>((set) => ({
    isLoggedIn: false,
    username: "",
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setUsername: (username) => set({ username }),
}));

export default useLoginState;