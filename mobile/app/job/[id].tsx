import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { applyToJob, fetchJobs } from '@/api/services';
import { Badge } from '@/components/Badge';
import { Card, PrimaryButton, Screen } from '@/components/ui';
import type { Job } from '@/types';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = React.useState<Job | null>(null);

  React.useEffect(() => {
    fetchJobs().then((jobs) => setJob(jobs.find((item) => item._id === id) ?? null));
  }, [id]);

  if (!job) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text>Loading job…</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Card>
          <Text className="text-3xl font-black text-slate-900">{job.title}</Text>
          <Text className="mt-2 text-sm text-slate-500">{job.companyName} • {job.area}</Text>

          <View className="mt-4 flex-row flex-wrap gap-2">
            <Badge label={job.shift} />
            <Badge label={`${job.openings} openings`} tone="success" />
            {job.fitScore ? <Badge label={`${job.fitScore}% match`} tone="accent" /> : null}
          </View>

          <Text className="mt-5 text-lg font-bold text-slate-900">Compensation</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-600">₹{job.payMin.toLocaleString()} - ₹{job.payMax.toLocaleString()} per month</Text>

          <Text className="mt-5 text-lg font-bold text-slate-900">About this role</Text>
          <Text className="mt-2 text-sm leading-7 text-slate-600">{job.description}</Text>

          <Text className="mt-5 text-lg font-bold text-slate-900">Required skills</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {job.reqSkills.map((skill) => <Badge key={skill} label={skill} />)}
          </View>

          <View className="mt-6">
            <PrimaryButton label="Apply for this job" onPress={() => applyToJob(job._id)} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
