import type { EnginePart } from '@/types';

export const ENGINE_PARTS: EnginePart[] = [
  {
    id: 'piston',
    name: 'Piston',
    category: 'Combustion System',
    function: 'Converts combustion energy into linear motion',
    status: 'optimal',
    rpm: '3,200 RPM',
    temperature: '185°C',
    material: 'Aluminum Alloy',
    description:
      'The piston reciprocates inside the cylinder, compressing fuel-air mixture and transmitting combustion force to the crankshaft via the connecting rod.',
    animationKey: 'pistonMove',
    color: '#00d4ff',
    position: [0, 0.5, 0],
    scale: [0.8, 0.8, 0.8],
  },
  {
    id: 'crankshaft',
    name: 'Crankshaft',
    category: 'Power Train',
    function: 'Converts linear piston motion into rotational force',
    status: 'optimal',
    rpm: '3,200 RPM',
    temperature: '95°C',
    material: 'Forged Steel',
    description:
      'The crankshaft is the backbone of the engine, converting reciprocating linear motion of pistons into the rotational torque that drives the transmission.',
    animationKey: 'crankshaftSpin',
    color: '#7c3aed',
    position: [0, -0.5, 0],
    scale: [1.2, 0.4, 0.4],
  },
  {
    id: 'valve',
    name: 'Intake Valve',
    category: 'Valvetrain',
    function: 'Controls air-fuel mixture entry into the cylinder',
    status: 'optimal',
    temperature: '210°C',
    material: 'Stainless Steel',
    description:
      'Intake valves open to allow the air-fuel mixture into the combustion chamber and close to seal it for compression. Timing is precisely controlled by the camshaft.',
    animationKey: 'valveOpen',
    color: '#10b981',
    position: [0.4, 0.8, 0],
    scale: [0.15, 0.6, 0.15],
  },
  {
    id: 'cylinder',
    name: 'Cylinder Block',
    category: 'Engine Structure',
    function: 'Houses pistons and forms combustion chambers',
    status: 'optimal',
    temperature: '92°C',
    material: 'Cast Iron / Aluminum',
    description:
      'The cylinder block is the core structural component containing the bores where pistons operate. It also houses coolant passages, oil galleries, and mounting points.',
    color: '#f59e0b',
    position: [0, 0, 0],
    scale: [1.0, 1.5, 1.0],
  },
  {
    id: 'camshaft',
    name: 'Camshaft',
    category: 'Valvetrain',
    function: 'Controls valve timing and lift',
    status: 'warning',
    rpm: '1,600 RPM',
    temperature: '88°C',
    material: 'Chilled Iron',
    description:
      'The camshaft rotates at half crankshaft speed, using precisely shaped lobes to open and close intake and exhaust valves at exact intervals in the combustion cycle.',
    animationKey: 'camshaftRotate',
    color: '#0080ff',
    position: [-0.4, 0.6, 0],
    scale: [0.2, 1.2, 0.2],
  },
  {
    id: 'sparkplug',
    name: 'Spark Plug',
    category: 'Ignition System',
    function: 'Ignites the air-fuel mixture',
    status: 'critical',
    temperature: '450°C',
    material: 'Ceramic / Iridium',
    description:
      'The spark plug delivers an electrical spark to ignite the compressed air-fuel mixture at precisely the right moment in the compression stroke, initiating combustion.',
    animationKey: 'sparkIgnite',
    color: '#f97316',
    position: [0, 1.1, 0],
    scale: [0.1, 0.3, 0.1],
  },
];

export const PART_MAP = Object.fromEntries(
  ENGINE_PARTS.map((p) => [p.id, p])
) as Record<string, EnginePart>;

export const STATUS_CONFIG = {
  optimal: { label: 'Optimal', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  warning: { label: 'Warning', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  critical: { label: 'Needs Service', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
};
