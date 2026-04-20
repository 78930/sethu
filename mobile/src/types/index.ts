export type UserType = 'worker' | 'factory' | 'admin';
export type ShiftType = 'Day' | 'Night' | 'Rotational' | 'General';

export type SalaryPreference = {
  min?: number;
  max?: number;
};

export type Profile = {
  _id?: string;
  name: string;
  email: string;
  userType: UserType;
  companyName?: string;
  roles: string[];
  skills: string[];
  certifications: string[];
  areas: string[];
  experienceYears?: number;
  shiftPreference: ShiftType[];
  salaryPreference?: SalaryPreference;
  availability?: string;
  verified?: boolean;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export type Job = {
  _id: string;
  title: string;
  area: string;
  areas?: string[];
  reqSkills: string[];
  preferredRoles?: string[];
  shift: ShiftType;
  payMin: number;
  payMax: number;
  openings: number;
  description: string;
  companyName: string;
  fitScore?: number;
  distanceKm?: number | null;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt?: string;
};

export type Application = {
  _id: string;
  jobId: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Hired';
  fitScore?: number;
  createdAt: string;
  job?: Job;
};

export type DashboardStats = {
  totalJobs: number;
  totalWorkers: number;
  totalFactories: number;
  totalApplications: number;
  pendingVerifications?: number;
  areaDemand?: Array<{ area: string; count: number }>;
  roleDemand?: Array<{ role: string; count: number }>;
};

export type ChatMessage = {
  _id?: string;
  from: string;
  to: string;
  body: string;
  createdAt: string;
};
