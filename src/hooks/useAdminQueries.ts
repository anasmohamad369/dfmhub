import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface RegistrationRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  location?: string;
  requirement?: string;
  source?: string;
  status?: string;
  assignedTo?: string;
  remarks?: string;
  createdAt: string;
}

export interface ProjectRecord {
  id: string;
  registrationId?: string;
  userFullName?: string;
  userPhone?: string;
  userEmail?: string;
  siteName: string;
  location: string;
  occupancy: string;
  dimensions: string;
  soilType: string;
  climateZone: string;
  avgResistance: string;
  targetResistance: string;
  checklistScore: string;
  lplClass: string;
  riskR1: string;
  createdAt: string;
}

// API Service Fetchers
async function fetchRegistrations(): Promise<RegistrationRecord[]> {
  const res = await fetch("/api/registrations");
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.error || "Failed to fetch registrations");
  }
  return json.data;
}

async function fetchProjects(): Promise<ProjectRecord[]> {
  const res = await fetch("/api/projects");
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.error || "Failed to fetch projects");
  }
  return json.data;
}

async function updateRegistrationApi(payload: { id: string; status?: string; assignedTo?: string }) {
  const res = await fetch("/api/registrations", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Custom TanStack Query Hooks
export function useRegistrationsQuery() {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useUpdateRegistrationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRegistrationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}
