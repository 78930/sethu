import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setAuthHeader } from '@/api/client';
import * as services from '@/api/services';
import { demoWorkerProfile } from '@/data/demo';
import type { Profile } from '@/types';

type AuthState = {
	token: string | null;
	user: Profile | null;
	hydrated: boolean;
	setHydrated: (value: boolean) => void;
	login: (payload: { email: string; password: string; userType?: Profile['userType'] }) => Promise<void>;
	register: (payload: Record<string, unknown>) => Promise<void>;
	logout: () => void;
	loadProfile: () => Promise<void>;
	updateLocalUser: (payload: Partial<Profile>) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			hydrated: Platform.OS === 'web',
			setHydrated: (value) => set({ hydrated: value }),
			login: async (payload) => {
				const data = await services.login(payload);
				setAuthHeader(data.token);
				set({ token: data.token, user: data.user ?? demoWorkerProfile });
			},
			register: async (payload) => {
				const data = await services.register(payload);
				setAuthHeader(data.token);
				set({ token: data.token, user: data.user ?? demoWorkerProfile });
			},
			logout: () => {
				setAuthHeader(null);
				set({ token: null, user: null });
			},
			loadProfile: async () => {
				if (!get().token) return;
				setAuthHeader(get().token);
				const user = await services.fetchProfile();
				set({ user });
			},
			updateLocalUser: (payload) => {
				set((state) => ({ user: state.user ? { ...state.user, ...payload } : state.user }));
			},
		}),
		{
			name: 'sethu-auth',
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				try {
					state?.setHydrated(true);
					if (state?.token) setAuthHeader(state.token);
				} catch (e) {
					state?.setHydrated(true);
				}
			},
		},
	),
);
