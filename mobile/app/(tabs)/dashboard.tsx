import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { fetchDashboardStats } from '@/api/services';
import { Card, Screen, SectionTitle } from '@/components/ui';
import { useAuthStore } from '@/store/auth';
import type { DashboardStats } from '@/types';

export default function DashboardScreen() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    fetchDashboardStats().then(setStats);
  }, []);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle title="Sethu dashboard" subtitle="Demand, supply, and hiring performance in Hyderabad clusters." />

        <View className="flex-row flex-wrap gap-4">
          <Card className="w-[48%]">
            <Text className="text-sm text-slate-500">Jobs</Text>
            <Text className="mt-2 text-3xl font-black text-slate-900">{stats?.totalJobs ?? 0}</Text>
          </Card>
          <Card className="w-[48%]">
            <Text className="text-sm text-slate-500">Workers</Text>
            <Text className="mt-2 text-3xl font-black text-slate-900">{stats?.totalWorkers ?? 0}</Text>
          </Card>
          <Card className="w-[48%]">
            <Text className="text-sm text-slate-500">Factories</Text>
            <Text className="mt-2 text-3xl font-black text-slate-900">{stats?.totalFactories ?? 0}</Text>
          </Card>
          <Card className="w-[48%]">
            <Text className="text-sm text-slate-500">Applications</Text>
            <Text className="mt-2 text-3xl font-black text-slate-900">{stats?.totalApplications ?? 0}</Text>
          </Card>
        </View>

        {user?.userType === 'admin' ? (
          <Card className="mt-5">
            <Text className="text-lg font-bold text-slate-900">Pending verifications</Text>
            <Text className="mt-2 text-3xl font-black text-safety-700">{stats?.pendingVerifications ?? 0}</Text>
          </Card>
        ) : null}

        <Card className="mt-5">
          <Text className="text-lg font-bold text-slate-900">Area demand</Text>
          <View className="mt-4 gap-3">
            {stats?.areaDemand?.map((item) => (
              <View key={item.area} className="rounded-2xl bg-steel-50 p-3">
                <Text className="font-semibold text-slate-800">{item.area}</Text>
                <Text className="mt-1 text-sm text-slate-500">{item.count} active needs</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card className="mt-5">
          <Text className="text-lg font-bold text-slate-900">Role demand</Text>
          <View className="mt-4 gap-3">
            {stats?.roleDemand?.map((item) => (
              <View key={item.role} className="rounded-2xl bg-safety-50 p-3">
                <Text className="font-semibold text-slate-800">{item.role}</Text>
                <Text className="mt-1 text-sm text-slate-500">{item.count} open positions</Text>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
