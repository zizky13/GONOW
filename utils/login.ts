import app from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useLoginState from "../hooks/loginState";

const auth = getAuth(app);

export const useLogin = () => {
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login...");   
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Login response:", userCredential);

      if (userCredential.user) {
        setIsLoggedIn(true); // Update Zustand state
        console.log("Updated isLoggedIn state to:", true);
        return userCredential;
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      throw error; // Propagate error to caller
    }
  };

  return { login };
};
