import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-steel-50 px-6">
      <Text className="text-3xl font-bold text-steel-900">Page not found</Text>
      <Text className="mt-2 text-center text-slate-500">The Sethu route you requested does not exist.</Text>
      <Link href="/" className="mt-6 rounded-2xl bg-safety-500 px-5 py-3 text-white">
        Go home
      </Link>
    </View>
  );
}
