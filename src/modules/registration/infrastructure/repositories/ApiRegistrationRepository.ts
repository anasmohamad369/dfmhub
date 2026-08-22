import { IRegistrationRepository } from "../../application/ports/IRegistrationRepository";
import {
  ProjectRegistrationEntity,
  RegistrationFormValues,
} from "../../domain/entities/ProjectRegistration";

export class ApiRegistrationRepository implements IRegistrationRepository {
  async save(data: RegistrationFormValues): Promise<ProjectRegistrationEntity> {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const endpoint = `${apiBase}/api/registrations`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to submit project registration");
    }

    const result = await response.json();
    return {
      id: result.data.id || `PRJ-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: result.data.fullName || data.fullName,
      phoneNumber: result.data.phoneNumber || data.phoneNumber,
      email: result.data.email || data.email,
      companyName: result.data.companyName || data.companyName,
      remarks: result.data.remarks || data.remarks,
      submittedAt: result.data.createdAt || new Date().toISOString(),
    };
  }

  async getAll(): Promise<ProjectRegistrationEntity[]> {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const endpoint = `${apiBase}/api/registrations`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) return [];
      const result = await response.json();
      return result.data || [];
    } catch (e) {
      console.error("Failed to fetch registrations from API:", e);
      return [];
    }
  }
}
