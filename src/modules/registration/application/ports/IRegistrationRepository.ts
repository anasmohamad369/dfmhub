import {
  ProjectRegistrationEntity,
  RegistrationFormValues,
} from "../../domain/entities/ProjectRegistration";

export interface IRegistrationRepository {
  save(data: RegistrationFormValues): Promise<ProjectRegistrationEntity>;
  getAll(): Promise<ProjectRegistrationEntity[]>;
}
