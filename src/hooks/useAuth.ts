import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  organizationId: string;
};

interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface IAuthActions {
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuth = create<IAuthState & IAuthActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user: User) => {
        set({
          isAuthenticated: true,
          user,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
      setUser: (user: User) => {
        set({
          user,
        });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
