import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Card, PrimaryButton } from '@/components/ui';
import type { Job } from '@/types';

export function JobCard({ job, onApply }: { job: Job; onApply?: (id: string) => void }) {
  return (
    <Card className="mb-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-900">{job.title}</Text>
          <Text className="mt-1 text-sm text-slate-500">{job.companyName} • {job.area}</Text>
        </View>
        {job.fitScore ? <Badge label={`${job.fitScore}% match`} tone="accent" /> : null}
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        <Badge label={job.shift} />
        <Badge label={`₹${job.payMin.toLocaleString()} - ₹${job.payMax.toLocaleString()}`} tone="success" />
        <Badge label={`${job.openings} openings`} />
      </View>

      <Text className="mt-3 text-sm leading-6 text-slate-600">{job.description}</Text>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {job.reqSkills.slice(0, 4).map((skill) => (
          <Badge key={skill} label={skill} />
        ))}
      </View>

      <View className="mt-4 gap-3">
        <Link href={`/job/${job._id}`} asChild>
          <PrimaryButton label="View details" />
        </Link>
        <PrimaryButton label="Apply now" onPress={() => onApply?.(job._id)} />
      </View>
    </Card>
  );
}
