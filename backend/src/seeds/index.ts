import bcrypt from 'bcryptjs';

import { connectDb } from '../config/db.js';
import { HYDERABAD_INDUSTRIAL_AREAS } from '../constants/areas.js';
import { User } from '../models/User.js';
import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { Message } from '../models/Message.js';

async function seed() {
  await connectDb();
  await Promise.all([User.deleteMany({}), Job.deleteMany({}), Application.deleteMany({}), Message.deleteMany({})]);

  const passwordHash = await bcrypt.hash('Password@123', 10);

  const admin = await User.create({
    name: 'Sethu Admin',
    email: 'admin@sethu.app',
    passwordHash,
    userType: 'admin',
    roles: ['Admin Executive'],
    skills: ['Operations', 'Verification'],
    areas: ['Balanagar', 'Jeedimetla'],
    shiftPreference: ['Day'],
    verified: true,
  });

  const factory = await User.create({
    name: 'AeroFab HR',
    email: 'factory@sethu.app',
    passwordHash,
    userType: 'factory',
    companyName: 'AeroFab Components Pvt Ltd',
    roles: ['Factory Manager', 'HR Manager'],
    skills: ['Hiring', 'Shift planning', 'Vendor coordination'],
    areas: ['Adibatla', 'Jeedimetla', 'Cherlapally'],
    shiftPreference: ['Day'],
    verified: true,
    location: { type: 'Point', coordinates: [78.6811, 17.1952] },
  });

  const worker = await User.create({
    name: 'Vikram Kumar',
    email: 'worker@sethu.app',
    passwordHash,
    userType: 'worker',
    roles: ['Production Supervisor', 'Quality Engineer'],
    skills: ['5S', 'SOP', 'Line balancing', 'Quality inspection', 'MS Excel', 'CAPA'],
    certifications: ['ITI Mechanical', 'Safety Basics'],
    areas: ['Balanagar', 'Jeedimetla', 'Patancheru', 'Genome Valley'],
    shiftPreference: ['Day', 'Rotational'],
    experienceYears: 4,
    availability: 'Immediate',
    salaryPreference: { min: 22000, max: 32000 },
    verified: true,
    location: { type: 'Point', coordinates: [78.4867, 17.385] },
  });

  const roleCycle = [
    'Production Supervisor',
    'CNC Operator',
    'Welder',
    'Quality Engineer',
    'Maintenance Technician',
    'Automation Engineer',
  ];

  const skillMap: Record<string, string[]> = {
    'Production Supervisor': ['5S', 'Line balancing', 'SOP'],
    'CNC Operator': ['CNC setup', 'Blueprint reading', 'Vernier'],
    'Welder': ['MIG welding', 'TIG welding', 'Fabrication'],
    'Quality Engineer': ['Quality inspection', 'CAPA', 'Documentation'],
    'Maintenance Technician': ['Breakdown maintenance', 'Preventive maintenance', 'Electrical basics'],
    'Automation Engineer': ['PLC', 'Sensors', 'Troubleshooting'],
  };

  const jobs: Array<Record<string, unknown>> = [];

  HYDERABAD_INDUSTRIAL_AREAS.forEach((area, index) => {
    const primaryRole = roleCycle[index % roleCycle.length];
    const secondaryRole = roleCycle[(index + 2) % roleCycle.length];

    jobs.push(
      {
        factoryId: factory._id,
        companyName: 'AeroFab Components Pvt Ltd',
        title: primaryRole,
        area: area.name,
        areas: [area.name],
        reqSkills: skillMap[primaryRole],
        preferredRoles: [primaryRole],
        shift: ['Day', 'Night', 'Rotational', 'General'][index % 4],
        payMin: 22000 + index * 1000,
        payMax: 32000 + index * 1200,
        openings: (index % 4) + 2,
        description: `${primaryRole} opening for ${area.name} plant with strong manufacturing discipline and output focus.`,
        status: 'Open',
        location: { type: 'Point', coordinates: area.coordinates },
      },
      {
        factoryId: factory._id,
        companyName: 'Hyderabad Industrial Systems',
        title: secondaryRole,
        area: area.name,
        areas: [area.name],
        reqSkills: skillMap[secondaryRole],
        preferredRoles: [secondaryRole],
        shift: ['Rotational', 'Day', 'Night', 'General'][index % 4],
        payMin: 23000 + index * 900,
        payMax: 33000 + index * 1200,
        openings: (index % 3) + 1,
        description: `${secondaryRole} requirement in ${area.name} with urgent shop-floor deployment.`,
        status: 'Open',
        location: { type: 'Point', coordinates: area.coordinates },
      },
    );
  });

  const insertedJobs = await Job.insertMany(jobs);

  await Application.create({
    jobId: insertedJobs[0]._id,
    workerId: worker._id,
    status: 'Under Review',
    fitScore: 92,
  });

  await Application.create({
    jobId: insertedJobs[3]._id,
    workerId: worker._id,
    status: 'Applied',
    fitScore: 86,
  });

  await Message.create({ from: factory._id, to: worker._id, body: 'Hi Vikram, are you available for a Jeedimetla interview this week?' });
  await Message.create({ from: worker._id, to: factory._id, body: 'Yes, I am available on Wednesday and Thursday.' });

  console.log('✅ Seed complete');
  console.log('Admin: admin@sethu.app / Password@123');
  console.log('Factory: factory@sethu.app / Password@123');
  console.log('Worker: worker@sethu.app / Password@123');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seed failed', error);
  process.exit(1);
});
