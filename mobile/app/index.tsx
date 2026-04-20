import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '@/store/auth';

export default function Index() {
  const { token, hydrated } = useAuthStore();

  // Show loading while hydrating, but default to public screen to unblock UI
  if (!hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-steel-900">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Redirect href={token ? '/(tabs)/jobs' : '/(public)'} />;
}
