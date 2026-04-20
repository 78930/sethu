import { Redirect } from 'expo-router';
import { ActivityIndicator, Platform, View } from 'react-native';

import { useAuthStore } from '@/store/auth';

export default function Index() {
	const { token, hydrated } = useAuthStore();

	// On web, skip the loading screen and redirect immediately
	// On native, show loading while hydrating
	if (!hydrated && Platform.OS !== 'web') {
		return (
			<View className="flex-1 items-center justify-center bg-steel-900">
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return <Redirect href={token ? '/(tabs)/jobs' : '/(public)'} />;
}
