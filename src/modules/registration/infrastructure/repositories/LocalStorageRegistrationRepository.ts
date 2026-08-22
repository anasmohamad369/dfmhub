import { IRegistrationRepository } from "../../application/ports/IRegistrationRepository";
import {
  ProjectRegistrationEntity,
  RegistrationFormValues,
} from "../../domain/entities/ProjectRegistration";

const STORAGE_KEY = "dfmhub_registrations";

export class LocalStorageRegistrationRepository implements IRegistrationRepository {
  async save(data: RegistrationFormValues): Promise<ProjectRegistrationEntity> {
    // Simulate network latency for scalable async workflow
    await new Promise((resolve) => setTimeout(resolve, 800));

    const registration: ProjectRegistrationEntity = {
      ...data,
      id: `PRJ-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const existing = await this.getAll();
      const updated = [registration, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    return registration;
  }

  async getAll(): Promise<ProjectRegistrationEntity[]> {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch (e) {
          console.error("Failed to parse registrations", e);
        }
      }
    }
    return [];
  }
}
