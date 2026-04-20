export type IndustrialArea = {
  name: string;
  label: string;
  coordinates: [number, number];
};

export const HYDERABAD_INDUSTRIAL_AREAS: IndustrialArea[] = [
  { name: 'Balanagar', label: 'Balanagar', coordinates: [78.4488, 17.4702] },
  { name: 'Jeedimetla', label: 'Jeedimetla', coordinates: [78.453, 17.5398] },
  { name: 'Patancheru', label: 'Patancheru', coordinates: [78.264, 17.5272] },
  { name: 'Cherlapally', label: 'Cherlapally', coordinates: [78.6524, 17.4655] },
  { name: 'IDA Bollaram', label: 'IDA Bollaram', coordinates: [78.3695, 17.5581] },
  { name: 'Pashamylaram', label: 'Pashamylaram', coordinates: [78.2872, 17.5153] },
  { name: 'Genome Valley', label: 'Genome Valley', coordinates: [78.6138, 17.6026] },
  { name: 'Adibatla', label: 'Adibatla', coordinates: [78.6811, 17.1952] },
  { name: 'Shamshabad', label: 'Shamshabad', coordinates: [78.4016, 17.2539] },
  { name: 'Fab City', label: 'Fab City', coordinates: [78.4895, 17.1932] },
  { name: 'GMR Aero City Aerospace Park', label: 'GMR Aero City Aerospace Park', coordinates: [78.4294, 17.2403] },
  { name: 'Kattedhan Industrial Area', label: 'Kattedhan Industrial Area', coordinates: [78.4257, 17.3163] },
];
