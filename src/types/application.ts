export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  contactPerson?: string;
  jobUrl?: string;
  deadline?: string;
  interviewDates?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUSES: ApplicationStatus[] = ["Applied", "Interview", "Offer", "Rejected"];
