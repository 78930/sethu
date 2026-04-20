import api from '@/api/client';
import { demoApplications, demoJobs, demoWorkerProfile } from '@/data/demo';
import type { Application, ChatMessage, DashboardStats, Job, Profile, UserType } from '@/types';

const safely = async <T>(call: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await call();
  } catch {
    return fallback;
  }
};

export async function fetchJobs(filters?: Record<string, string>) {
  return safely(async () => {
    const response = await api.get<Job[]>('/jobs', { params: filters });
    return response.data;
  }, demoJobs);
}

export async function fetchRecommendedJobs() {
  return safely(async () => {
    const response = await api.get<Job[]>('/jobs/recommended/me');
    return response.data;
  }, demoJobs);
}

export async function fetchApplications() {
  return safely(async () => {
    const response = await api.get<Application[]>('/users/me/applications');
    return response.data;
  }, demoApplications);
}

export async function fetchProfile() {
  return safely(async () => {
    const response = await api.get<Profile>('/auth/me');
    return response.data;
  }, demoWorkerProfile);
}

export async function updateProfile(payload: Partial<Profile>) {
  return safely(async () => {
    const response = await api.patch<Profile>('/users/me', payload);
    return response.data;
  }, { ...demoWorkerProfile, ...payload });
}

export async function login(payload: { email: string; password: string; userType?: UserType }) {
  return safely(async () => {
    const response = await api.post('/auth/login', payload);
    return response.data;
  }, {
    token: 'demo-token',
    user: {
      ...demoWorkerProfile,
      email: payload.email,
      userType: payload.userType ?? 'worker',
    },
  });
}

export async function register(payload: Record<string, unknown>) {
  return safely(async () => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  }, {
    token: 'demo-token',
    user: {
      ...demoWorkerProfile,
      ...payload,
    },
  });
}

export async function createJob(payload: Record<string, unknown>) {
  return safely(async () => {
    const response = await api.post<Job>('/jobs', payload);
    return response.data;
  }, {
    ...demoJobs[0],
    _id: `demo-${Date.now()}`,
    ...payload,
  } as Job);
}

export async function applyToJob(jobId: string) {
  return safely(async () => {
    const response = await api.post(`/jobs/${jobId}/apply`);
    return response.data;
  }, {
    ok: true,
    message: 'Applied successfully (demo mode)',
  });
}

export async function fetchDashboardStats() {
  return safely(async () => {
    const response = await api.get<DashboardStats>('/admin/stats');
    return response.data;
  }, {
    totalJobs: demoJobs.length,
    totalWorkers: 1240,
    totalFactories: 86,
    totalApplications: 428,
    pendingVerifications: 18,
    areaDemand: [
      { area: 'Jeedimetla', count: 28 },
      { area: 'Patancheru', count: 24 },
      { area: 'Adibatla', count: 19 },
    ],
    roleDemand: [
      { role: 'Production Supervisor', count: 14 },
      { role: 'CNC Operator', count: 12 },
      { role: 'Maintenance Technician', count: 10 },
    ],
  });
}

export async function fetchMessages(peerId: string) {
  return safely(async () => {
    const response = await api.get<ChatMessage[]>(`/chat/${peerId}`);
    return response.data;
  }, [
    {
      from: 'factory-demo',
      to: 'worker-demo',
      body: 'Hi, your profile looks strong for our Jeedimetla opening.',
      createdAt: new Date().toISOString(),
    },
  ]);
}

export async function sendMessage(peerId: string, body: string) {
  return safely(async () => {
    const response = await api.post(`/chat/${peerId}`, { body });
    return response.data;
  }, {
    from: 'me',
    to: peerId,
    body,
    createdAt: new Date().toISOString(),
  });
}
