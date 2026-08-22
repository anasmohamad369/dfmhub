import { create } from "zustand";
import {
  ProjectRegistrationEntity,
  RegistrationFormValues,
} from "../../domain/entities/ProjectRegistration";
import { ApiRegistrationRepository } from "../../infrastructure/repositories/ApiRegistrationRepository";
import { LocalStorageRegistrationRepository } from "../../infrastructure/repositories/LocalStorageRegistrationRepository";

const apiRepository = new ApiRegistrationRepository();
const fallbackRepository = new LocalStorageRegistrationRepository();

interface RegistrationStoreState {
  registrations: ProjectRegistrationEntity[];
  isSubmitting: boolean;
  isSubmitted: boolean;
  lastSubmitted: ProjectRegistrationEntity | null;
  submitProject: (data: RegistrationFormValues) => Promise<ProjectRegistrationEntity>;
  addRegistration: (record: ProjectRegistrationEntity) => void;
  resetSubmission: () => void;
  loadRegistrations: () => Promise<void>;
}

export const useRegistrationStore = create<RegistrationStoreState>((set) => ({
  registrations: [],
  isSubmitting: false,
  isSubmitted: false,
  lastSubmitted: null,

  submitProject: async (data: RegistrationFormValues) => {
    set({ isSubmitting: true });
    try {
      let result: ProjectRegistrationEntity;
      try {
        result = await apiRepository.save(data);
      } catch (e) {
        console.warn("API submission fallback to LocalStorage repository...", e);
        result = await fallbackRepository.save(data);
      }

      set((state) => ({
        registrations: [result, ...state.registrations],
        isSubmitting: false,
        isSubmitted: true,
        lastSubmitted: result,
      }));
      return result;
    } catch (error) {
      console.error("Failed to submit project registration", error);
      set({ isSubmitting: false });
      throw error;
    }
  },

  addRegistration: (record: ProjectRegistrationEntity) => {
    set((state) => ({
      registrations: [record, ...state.registrations.filter((r) => r.id !== record.id)],
      isSubmitted: true,
      lastSubmitted: record,
    }));
  },

  resetSubmission: () => {
    set({ isSubmitted: false, lastSubmitted: null });
  },

  loadRegistrations: async () => {
    let list: ProjectRegistrationEntity[] = [];
    try {
      list = await apiRepository.getAll();
    } catch (e) {
      list = await fallbackRepository.getAll();
    }
    set({ registrations: list });
  },
}));

