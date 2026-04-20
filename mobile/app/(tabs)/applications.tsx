import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Card, Screen, SectionTitle } from '@/components/ui';
import { fetchApplications } from '@/api/services';
import type { Application } from '@/types';

export default function ApplicationsScreen() {
  const [applications, setApplications] = React.useState<Application[]>([]);

  React.useEffect(() => {
    fetchApplications().then(setApplications);
  }, []);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle title="My applications" subtitle="Track your pipeline from applied to hired." />
        <View className="gap-4">
          {applications.map((item) => (
            <Card key={item._id}>
              <View className="flex-row items-start justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-900">{item.job?.title}</Text>
                  <Text className="mt-1 text-sm text-slate-500">{item.job?.companyName} • {item.job?.area}</Text>
                </View>
                <Badge label={item.status} tone={item.status === 'Shortlisted' ? 'success' : 'accent'} />
              </View>
              <Text className="mt-3 text-sm text-slate-500">Fit score: {item.fitScore ?? '-'}%</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
