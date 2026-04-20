import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput } from 'react-native';
import { z } from 'zod';

import { createJob } from '@/api/services';
import { Card, PrimaryButton, Screen } from '@/components/ui';

const schema = z.object({
  title: z.string().min(3),
  area: z.string().min(2),
  reqSkills: z.string().min(2),
  shift: z.string().min(2),
  payMin: z.string().min(1),
  payMax: z.string().min(1),
  openings: z.string().min(1),
  description: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export default function PostJobScreen() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: 'Production Supervisor',
      area: 'Jeedimetla',
      reqSkills: '5S, SOP, line balancing',
      shift: 'Day',
      payMin: '28000',
      payMax: '36000',
      openings: '4',
      description: 'Lead the shop-floor team and improve daily output and discipline.',
    },
  });

  async function onSubmit(values: FormValues) {
    await createJob({
      ...values,
      reqSkills: values.reqSkills.split(',').map((item) => item.trim()),
      payMin: Number(values.payMin),
      payMax: Number(values.payMax),
      openings: Number(values.openings),
      companyName: 'Sethu Demo Factory',
    });
    router.replace('/(tabs)/jobs');
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Card>
          <Text className="text-3xl font-black text-slate-900">Post a job</Text>
          <Text className="mt-2 text-sm text-slate-500">Create a Hyderabad manufacturing vacancy in minutes.</Text>

          {([
            ['title', 'Role title'],
            ['area', 'Industrial area'],
            ['reqSkills', 'Skills (comma separated)'],
            ['shift', 'Shift'],
            ['payMin', 'Minimum pay'],
            ['payMax', 'Maximum pay'],
            ['openings', 'Openings'],
            ['description', 'Description'],
          ] as const).map(([fieldName, label]) => (
            <React.Fragment key={fieldName}>
              <Text className="mt-4 text-sm font-semibold text-slate-700">{label}</Text>
              <Controller
                control={control}
                name={fieldName}
                render={({ field: { onChange, value } }) => (
                  <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={value} onChangeText={onChange} multiline={fieldName === 'description'} />
                )}
              />
            </React.Fragment>
          ))}

          <Text className="mt-4 text-xs leading-5 text-slate-500">
            Tip: add exact lat/lng and commute limits later to improve geo-radius matching.
          </Text>

          <Text className="mt-6" />
          <PrimaryButton label="Create job post" onPress={handleSubmit(onSubmit)} />
        </Card>
      </ScrollView>
    </Screen>
  );
}
