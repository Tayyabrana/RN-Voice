import {create} from 'zustand';

export type User = {
  id: string;
  username: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useAuth = create<AuthState>(set => ({
  user: null,
  setUser: user => set({user}),
}));

export default useAuth;
