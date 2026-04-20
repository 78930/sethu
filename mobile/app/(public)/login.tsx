import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { Badge } from '@/components/Badge';
import { Card, PrimaryButton, Screen, SecondaryButton } from '@/components/ui';
import type { UserType } from '@/types';
import { useAuthStore } from '@/store/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'worker@sethu.app', password: 'Password@123' },
  });
  const login = useAuthStore((state) => state.login);
  const [selectedRole, setSelectedRole] = React.useState<UserType>('worker');

  async function onSubmit(values: FormValues) {
    await login({ ...values, userType: selectedRole });
    router.replace('/(tabs)/jobs');
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Card>
          <Text className="text-3xl font-black text-slate-900">Login to Sethu</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            Choose a role and sign in. Demo logins are seeded in the README.
          </Text>

          <Text className="mt-5 text-sm font-semibold text-slate-700">Login as</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {(['worker', 'factory', 'admin'] as UserType[]).map((role) => (
              <View key={role}>
                <SecondaryButton label={role.toUpperCase()} onPress={() => setSelectedRole(role)} />
                {selectedRole === role ? <View className="mt-2"><Badge label="Selected" tone="accent" /></View> : null}
              </View>
            ))}
          </View>

          <Text className="mt-6 text-sm font-semibold text-slate-700">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text className="mt-4 text-sm font-semibold text-slate-700">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <View className="mt-6 gap-3">
            <PrimaryButton label="Login" onPress={handleSubmit(onSubmit)} />
            <Link href="/(public)/register" asChild>
              <SecondaryButton label="Create a new account" />
            </Link>
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
