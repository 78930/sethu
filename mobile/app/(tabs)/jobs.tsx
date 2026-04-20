import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { applyToJob, fetchRecommendedJobs } from '@/api/services';
import { AreaPill } from '@/components/AreaPill';
import { JobCard } from '@/components/JobCard';
import { Card, PrimaryButton, Screen, SectionTitle } from '@/components/ui';
import { HYDERABAD_INDUSTRIAL_AREAS } from '@/constants/areas';
import { PRIORITY_ROLES } from '@/constants/roles';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import type { Job } from '@/types';
import { router } from 'expo-router';

const shifts = ['Day', 'Night', 'Rotational', 'General'];

export default function JobsScreen() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const { selectedArea, selectedRole, selectedShift, setSelectedArea, setSelectedRole, setSelectedShift } = useAppStore();
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    fetchRecommendedJobs().then(setJobs);
  }, []);

  const filtered = jobs.filter((job) => {
    if (selectedArea && job.area !== selectedArea) return false;
    if (selectedRole && !(job.preferredRoles ?? []).includes(selectedRole) && job.title !== selectedRole) return false;
    if (selectedShift && job.shift !== selectedShift) return false;
    return true;
  });

  const onApply = async (jobId: string) => {
    await applyToJob(jobId);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle
          title={user?.userType === 'factory' ? 'Talent demand overview' : 'AI-matched jobs near you'}
          subtitle="Hyderabad manufacturing openings filtered by industrial area, role, and shift."
        />

        {user?.userType === 'factory' ? (
          <Card className="mb-5">
            <Text className="text-lg font-bold text-slate-900">Post urgent hiring</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-500">
              Create a vacancy for production, quality, maintenance, automation, or shop-floor roles.
            </Text>
            <View className="mt-4">
              <PrimaryButton label="Post a job" onPress={() => router.push('/factory/post-job')} />
            </View>
          </Card>
        ) : null}

        <Card className="mb-5">
          <Text className="text-sm font-semibold text-slate-700">Filter by area</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            <AreaPill label="All" active={!selectedArea} onPress={() => setSelectedArea(null)} />
            {HYDERABAD_INDUSTRIAL_AREAS.map((item) => (
              <AreaPill key={item.name} label={item.name} active={selectedArea === item.name} onPress={() => setSelectedArea(item.name)} />
            ))}
          </ScrollView>

          <Text className="mt-5 text-sm font-semibold text-slate-700">Priority roles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            <AreaPill label="All" active={!selectedRole} onPress={() => setSelectedRole(null)} />
            {PRIORITY_ROLES.map((role) => (
              <AreaPill key={role} label={role} active={selectedRole === role} onPress={() => setSelectedRole(role)} />
            ))}
          </ScrollView>

          <Text className="mt-5 text-sm font-semibold text-slate-700">Shift</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            <AreaPill label="All" active={!selectedShift} onPress={() => setSelectedShift(null)} />
            {shifts.map((shift) => (
              <AreaPill key={shift} label={shift} active={selectedShift === shift} onPress={() => setSelectedShift(shift)} />
            ))}
          </ScrollView>
        </Card>

        {filtered.map((job) => (
          <JobCard key={job._id} job={job} onApply={user?.userType === 'worker' ? onApply : undefined} />
        ))}

        {filtered.length === 0 ? (
          <Card>
            <Text className="text-lg font-bold text-slate-900">No jobs found</Text>
            <Text className="mt-2 text-sm text-slate-500">Try another industrial area, role, or shift.</Text>
          </Card>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
