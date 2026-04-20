import { Text, View } from 'react-native';

export function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'accent' | 'success' }) {
  const className =
    tone === 'accent'
      ? 'bg-safety-100 text-safety-700'
      : tone === 'success'
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-steel-100 text-steel-700';

  return (
    <View className={`rounded-full px-3 py-1 ${className.split(' ')[0]}`}>
      <Text className={`text-xs font-semibold ${className.split(' ')[1]}`}>{label}</Text>
    </View>
  );
}
