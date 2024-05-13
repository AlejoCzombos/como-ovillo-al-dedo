import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/lib/firebase/firebase";
import { User, UserCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  user: null | object;
  token: null | string;
  setCredentials: (userCredential: User) => void;
  getToken: () => string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userInfo: FormData) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      getToken: () => {
        return get().token;
      },
      setCredentials: (user) => {
        const newState = {
          isAuthenticated: true,
          token: user.accessToken,
        };
        console.log(user);

        Cookies.set("auth", JSON.stringify(newState), {
          expires: 7,
        });
        set(newState);
      },
      login: async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const newState = {
              isAuthenticated: true,
              token: userCredential.user.accessToken,
            };

            Cookies.set("auth", JSON.stringify(newState), {
              expires: 7,
            });
            set(newState);
            return true;
          })
          .catch((error) => {
            return false;
          });
      },
      register: async (userInfo) => {
        // Registering user code
      },
      logout: async () => {
        await signOut(auth);
        Cookies.remove("auth");
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
