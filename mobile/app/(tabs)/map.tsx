import React from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

import { Card, Screen, SectionTitle } from '@/components/ui';
import { HYDERABAD_INDUSTRIAL_AREAS } from '@/constants/areas';
import { fetchJobs } from '@/api/services';
import type { Job } from '@/types';

export default function MapScreen() {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const areaCounts = HYDERABAD_INDUSTRIAL_AREAS.map((area) => ({
    ...area,
    count: jobs.filter((job) => job.area === area.name).length,
  }));

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle title="Industrial area map" subtitle="Approximate job clusters and demand pockets across Hyderabad." />

        {Platform.OS === 'web' ? (
          <Card className="mb-5">
            <Text className="text-sm leading-6 text-slate-500">
              Web fallback mode shows area clusters as cards. Native devices render an interactive map.
            </Text>
          </Card>
        ) : (() => {
          const Maps = require('react-native-maps');
          const MapView = Maps.default;
          const Marker = Maps.Marker;

          return (
            <Card className="mb-5 p-2">
              <MapView
                style={{ width: '100%', height: 320, borderRadius: 20 }}
                initialRegion={{
                  latitude: 17.385,
                  longitude: 78.4867,
                  latitudeDelta: 0.55,
                  longitudeDelta: 0.55,
                }}
              >
                {areaCounts.map((item) => (
                  <Marker
                    key={item.name}
                    coordinate={{ latitude: item.coordinates[1], longitude: item.coordinates[0] }}
                    title={item.name}
                    description={`${item.count} active jobs`}
                  />
                ))}
              </MapView>
            </Card>
          );
        })()}

        <View className="gap-4">
          {areaCounts.map((item) => (
            <Card key={item.name}>
              <Text className="text-lg font-bold text-slate-900">{item.name}</Text>
              <Text className="mt-1 text-sm text-slate-500">Approx coordinates: {item.coordinates[1].toFixed(4)}, {item.coordinates[0].toFixed(4)}</Text>
              <Text className="mt-3 text-sm font-semibold text-safety-700">{item.count} seeded openings</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
