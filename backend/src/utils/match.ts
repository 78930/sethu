import type { HydratedDocument } from 'mongoose';
import type { IUser } from '../models/User.js';
import type { IJob } from '../models/Job.js';

const normalize = (value: string) => value.trim().toLowerCase();

export function haversineKm([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export function scoreWorkerForJob(worker: HydratedDocument<IUser>, job: HydratedDocument<IJob>) {
  const workerSkills = new Set((worker.skills ?? []).map(normalize));
  const workerRoles = new Set((worker.roles ?? []).map(normalize));
  const workerAreas = new Set((worker.areas ?? []).map(normalize));

  const skillHits = job.reqSkills.filter((skill) => workerSkills.has(normalize(skill))).length;
  const roleHit = workerRoles.has(normalize(job.title)) || (job.preferredRoles ?? []).some((role) => workerRoles.has(normalize(role)));
  const areaHit = workerAreas.has(normalize(job.area));
  const shiftHit = (worker.shiftPreference ?? []).includes(job.shift);

  const skillScore = job.reqSkills.length ? (skillHits / job.reqSkills.length) * 55 : 25;
  const roleScore = roleHit ? 20 : 0;
  const areaScore = areaHit ? 15 : 0;
  const shiftScore = shiftHit ? 10 : 0;

  const workerCoords = worker.location?.coordinates as [number, number] | undefined;
  const jobCoords = job.location?.coordinates as [number, number] | undefined;
  const distanceKm = workerCoords && jobCoords ? haversineKm(workerCoords, jobCoords) : null;
  const distanceBonus = distanceKm !== null ? Math.max(0, 15 - Math.min(distanceKm, 15)) : 5;

  const fitScore = Math.round(Math.min(100, skillScore + roleScore + areaScore + shiftScore + distanceBonus));
  return { fitScore, distanceKm };
}
