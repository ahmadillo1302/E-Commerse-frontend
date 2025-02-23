import { create } from "zustand";

interface RegisterState {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
  setFirstName: (name) => set({ first_name: name }),
  setLastName: (name) => set({ last_name: name }),
  setPhoneNumber: (phone) => set({ phone_number: phone }),
  setEmail: (email) => set({ email: email }),
  setPassword: (password) => set({ password: password }),
}));
