import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { Card, PrimaryButton, Screen, SecondaryButton } from '@/components/ui';
import type { UserType } from '@/types';
import { useAuthStore } from '@/store/auth';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  companyName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'Demo User',
      email: 'worker@sethu.app',
      password: 'Password@123',
      companyName: 'Sethu Demo Factory',
    },
  });
  const [selectedRole, setSelectedRole] = React.useState<UserType>('worker');

  async function onSubmit(values: FormValues) {
    await register({
      ...values,
      userType: selectedRole,
      roles: selectedRole === 'worker' ? ['Production Supervisor'] : ['Factory Manager'],
      skills: ['MS Excel', 'SOP', 'Hiring'],
      areas: ['Balanagar', 'Jeedimetla'],
      shiftPreference: ['Day'],
      availability: 'Immediate',
    });
    router.replace('/(tabs)/jobs');
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Card>
          <Text className="text-3xl font-black text-slate-900">Create account</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            Register as worker, factory, or admin demo user.
          </Text>

          <Text className="mt-5 text-sm font-semibold text-slate-700">Account type</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {(['worker', 'factory', 'admin'] as UserType[]).map((role) => (
              <SecondaryButton key={role} label={role.toUpperCase()} onPress={() => setSelectedRole(role)} />
            ))}
          </View>

          <Text className="mt-5 text-sm font-semibold text-slate-700">Full name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={value} onChangeText={onChange} />
            )}
          />

          <Text className="mt-4 text-sm font-semibold text-slate-700">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={value} onChangeText={onChange} autoCapitalize="none" />
            )}
          />

          <Text className="mt-4 text-sm font-semibold text-slate-700">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={value} onChangeText={onChange} secureTextEntry />
            )}
          />

          {selectedRole === 'factory' ? (
            <>
              <Text className="mt-4 text-sm font-semibold text-slate-700">Factory / Company name</Text>
              <Controller
                control={control}
                name="companyName"
                render={({ field: { onChange, value } }) => (
                  <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={value} onChangeText={onChange} />
                )}
              />
            </>
          ) : null}

          <View className="mt-6 gap-3">
            <PrimaryButton label="Create account" onPress={handleSubmit(onSubmit)} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
