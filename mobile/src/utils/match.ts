import type { Job, Profile } from '@/types';

const normalize = (value: string) => value.trim().toLowerCase();

export function computeFitScore(profile: Profile, job: Job): number {
  const workerSkills = new Set(profile.skills.map(normalize));
  const workerRoles = new Set(profile.roles.map(normalize));
  const workerAreas = new Set(profile.areas.map(normalize));

  const skillHits = job.reqSkills.filter((skill) => workerSkills.has(normalize(skill))).length;
  const roleHits = (job.preferredRoles ?? []).filter((role) => workerRoles.has(normalize(role))).length;
  const areaHit = workerAreas.has(normalize(job.area));
  const shiftHit = profile.shiftPreference.includes(job.shift);

  const skillScore = job.reqSkills.length ? (skillHits / job.reqSkills.length) * 55 : 20;
  const roleScore = (job.preferredRoles?.length ?? 0) ? (roleHits / (job.preferredRoles?.length ?? 1)) * 20 : 10;
  const areaScore = areaHit ? 15 : 0;
  const shiftScore = shiftHit ? 10 : 0;

  return Math.round(skillScore + roleScore + areaScore + shiftScore);
}
