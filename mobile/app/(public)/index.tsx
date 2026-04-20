import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { BridgeLogo } from '@/components/BridgeLogo';
import { Badge } from '@/components/Badge';
import { Card, PrimaryButton, Screen, SecondaryButton } from '@/components/ui';
import { HYDERABAD_INDUSTRIAL_AREAS } from '@/constants/areas';
import { PRIORITY_ROLES } from '@/constants/roles';

export default function LandingScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View className="rounded-[28px] bg-steel-900 p-6">
          <View className="mb-4 flex-row items-center gap-4">
            <BridgeLogo size={64} />
            <View className="flex-1">
              <Text className="text-3xl font-black text-white">Sethu</Text>
              <Text className="mt-1 text-sm text-steel-100">Connecting Hyderabad Factories to Top Talent</Text>
            </View>
          </View>

          <Text className="text-4xl font-black leading-tight text-white">
            Hyper-local staffing for Hyderabad manufacturing.
          </Text>
          <Text className="mt-3 text-base leading-7 text-steel-100">
            Match workers to factory jobs by industrial area, role, skill, shift, and commute.
          </Text>

          <View className="mt-6 gap-3">
            <Link href="/(public)/register" asChild>
              <PrimaryButton label="Create account" />
            </Link>
            <Link href="/(public)/login" asChild>
              <SecondaryButton label="Login" />
            </Link>
          </View>
        </View>

        <Card className="mt-5">
          <Text className="text-xl font-bold text-slate-900">Priority hiring roles</Text>
          <View className="mt-4 flex-row flex-wrap gap-2">
            {PRIORITY_ROLES.map((role) => (
              <Badge key={role} label={role} tone="accent" />
            ))}
          </View>
        </Card>

        <Card className="mt-5">
          <Text className="text-xl font-bold text-slate-900">Core industrial zones</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            From Balanagar and Jeedimetla to Adibatla and Genome Valley.
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-2">
            {HYDERABAD_INDUSTRIAL_AREAS.map((item) => (
              <Badge key={item.name} label={item.name} />
            ))}
          </View>
        </Card>

        <View className="mt-5 gap-4">
          <Card>
            <Text className="text-lg font-bold text-slate-900">For workers</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-500">
              Build a profile, highlight ITI/diploma experience, upload certificates, choose shifts, and get smart local matches.
            </Text>
          </Card>
          <Card>
            <Text className="text-lg font-bold text-slate-900">For factories</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-500">
              Post urgent openings, search workers by skill and area, shortlist faster, and manage temp staffing at scale.
            </Text>
          </Card>
          <Card>
            <Text className="text-lg font-bold text-slate-900">For admins</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-500">
              Verify employers and workers, track demand by area, and monitor placements with local analytics.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
}
