import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

export function Screen({ children }: { children: ReactNode }) {
  return <View className="flex-1 bg-steel-50">{children}</View>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-slate-900">{title}</Text>
      {subtitle ? <Text className="mt-1 text-sm text-slate-500">{subtitle}</Text> : null}
    </View>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-3xl bg-white p-4 shadow-sm ${className}`}>{children}</View>;
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center rounded-2xl px-4 py-3 ${disabled ? 'bg-slate-300' : 'bg-safety-500'}`}
    >
      <Text className="font-semibold text-white">{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="items-center rounded-2xl border border-steel-300 bg-white px-4 py-3">
      <Text className="font-semibold text-steel-800">{label}</Text>
    </Pressable>
  );
}
