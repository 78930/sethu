import { create } from 'zustand';

import type { Job } from '@/types';

type AppState = {
  selectedArea: string | null;
  selectedRole: string | null;
  selectedShift: string | null;
  jobs: Job[];
  setSelectedArea: (area: string | null) => void;
  setSelectedRole: (role: string | null) => void;
  setSelectedShift: (shift: string | null) => void;
  setJobs: (jobs: Job[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedArea: null,
  selectedRole: null,
  selectedShift: null,
  jobs: [],
  setSelectedArea: (selectedArea) => set({ selectedArea }),
  setSelectedRole: (selectedRole) => set({ selectedRole }),
  setSelectedShift: (selectedShift) => set({ selectedShift }),
  setJobs: (jobs) => set({ jobs }),
}));
