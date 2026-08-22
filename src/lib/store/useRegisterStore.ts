import { create } from "zustand";
import { RegisterFormValues } from "../schemas/registerSchema";

export interface RegisteredProject extends RegisterFormValues {
  id: string;
  submittedAt: string;
}

interface RegisterStore {
  registrations: RegisteredProject[];
  isSubmitting: boolean;
  isSubmitted: boolean;
  lastSubmitted: RegisteredProject | null;
  submitProject: (data: RegisterFormValues) => Promise<void>;
  resetSubmission: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  registrations: [],
  isSubmitting: false,
  isSubmitted: false,
  lastSubmitted: null,

  submitProject: async (data: RegisterFormValues) => {
    set({ isSubmitting: true });

    // Simulate API submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newProject: RegisteredProject = {
      ...data,
      id: `PRJ-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toISOString(),
    };

    set((state) => ({
      registrations: [newProject, ...state.registrations],
      isSubmitting: false,
      isSubmitted: true,
      lastSubmitted: newProject,
    }));
  },

  resetSubmission: () => {
    set({ isSubmitted: false, lastSubmitted: null });
  },
}));
