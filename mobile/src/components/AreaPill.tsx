import { Pressable, Text } from 'react-native';

export function AreaPill({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 rounded-full px-4 py-2 ${active ? 'bg-steel-800' : 'bg-white border border-steel-200'}`}
    >
      <Text className={`${active ? 'text-white' : 'text-steel-800'} text-sm font-medium`}>{label}</Text>
    </Pressable>
  );
}
