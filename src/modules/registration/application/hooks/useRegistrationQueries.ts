import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ProjectRegistrationEntity,
  RegistrationFormValues,
} from "../../domain/entities/ProjectRegistration";
import { ApiRegistrationRepository } from "../../infrastructure/repositories/ApiRegistrationRepository";
import { LocalStorageRegistrationRepository } from "../../infrastructure/repositories/LocalStorageRegistrationRepository";
import { useRegistrationStore } from "../store/useRegistrationStore";

const apiRepository = new ApiRegistrationRepository();
const fallbackRepository = new LocalStorageRegistrationRepository();

export const REGISTRATIONS_QUERY_KEY = ["project-registrations"];

export function useRegisterProjectMutation() {
  const queryClient = useQueryClient();
  const { addRegistration } = useRegistrationStore();

  return useMutation<ProjectRegistrationEntity, Error, RegistrationFormValues>({
    mutationFn: async (values: RegistrationFormValues) => {
      try {
        return await apiRepository.save(values);
      } catch (e) {
        console.warn("API mutation error, falling back to LocalStorage repository...", e);
        return await fallbackRepository.save(values);
      }
    },
    onSuccess: (data) => {
      // Synchronize already-saved record with Zustand store
      addRegistration(data);
      // Invalidate TanStack query cache
      queryClient.invalidateQueries({ queryKey: REGISTRATIONS_QUERY_KEY });
    },
  });
}

export function useRegistrationsQuery() {
  return useQuery<ProjectRegistrationEntity[], Error>({
    queryKey: REGISTRATIONS_QUERY_KEY,
        queryFn: async () => {
      try {
        return await apiRepository.getAll();
      } catch (e) {
        return await fallbackRepository.getAll();
      }
    },
  });
}
