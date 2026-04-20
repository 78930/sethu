import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { updateProfile } from '@/api/services';
import { Badge } from '@/components/Badge';
import { Card, PrimaryButton, Screen, SectionTitle } from '@/components/ui';
import { useAuthStore } from '@/store/auth';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const updateLocalUser = useAuthStore((state) => state.updateLocalUser);
  const [name, setName] = React.useState(user?.name ?? '');
  const [experience, setExperience] = React.useState(String(user?.experienceYears ?? ''));

  const onSave = async () => {
    const payload = {
      name,
      experienceYears: Number(experience) || 0,
    };
    const updated = await updateProfile(payload);
    updateLocalUser(updated);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle title="Profile" subtitle="Skills, roles, locations, and work preferences." />

        <Card>
          <Text className="text-sm font-semibold text-slate-700">Name</Text>
          <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={name} onChangeText={setName} />

          <Text className="mt-4 text-sm font-semibold text-slate-700">Experience (years)</Text>
          <TextInput className="mt-2 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3" value={experience} onChangeText={setExperience} keyboardType="numeric" />

          <Text className="mt-4 text-sm font-semibold text-slate-700">Preferred roles</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {user?.roles?.map((role) => <Badge key={role} label={role} />)}
          </View>

          <Text className="mt-4 text-sm font-semibold text-slate-700">Skills</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {user?.skills?.map((skill) => <Badge key={skill} label={skill} tone="accent" />)}
          </View>

          <Text className="mt-4 text-sm font-semibold text-slate-700">Preferred areas</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {user?.areas?.map((area) => <Badge key={area} label={area} />)}
          </View>

          <View className="mt-6">
            <PrimaryButton label="Save profile" onPress={onSave} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
