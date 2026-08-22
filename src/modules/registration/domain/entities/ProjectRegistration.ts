import { z } from "zod";
import { registrationSchema } from "../validation/registrationSchema";

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export interface ProjectRegistrationEntity extends RegistrationFormValues {
  id: string;
  submittedAt: string;
}
