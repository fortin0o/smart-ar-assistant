const fs = require('fs');

let code = fs.readFileSync('src/components/model/ModelParts.tsx', 'utf8');

// 1. Replace all meshStandardMaterial
code = code.replace(/<meshStandardMaterial([^>]+)\/>/g, (match, attrs) => {
  return `<EngineMaterial${attrs}/>`;
});

// 2. Inject partId into EngineMaterials based on their location
code = code.replace(/function EngineBlock\(\) \{([\s\S]*?)function CylinderHead/g, (match) => {
  // Only add partId="cylinder" if it doesn't already have partId
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="cylinder"');
});

code = code.replace(/function Crankshaft\(\) \{([\s\S]*?)function PistonAssembly/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="crankshaft"');
});

code = code.replace(/<ClickGroup partId="piston">([\s\S]*?)<\/ClickGroup>/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="piston"');
});

code = code.replace(/<ClickGroup partId="crankshaft">([\s\S]*?)<\/ClickGroup>/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="crankshaft"');
});

code = code.replace(/function Camshaft\(\) \{([\s\S]*?)function ValveSet/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="camshaft"');
});

code = code.replace(/function ValveSet\(\) \{([\s\S]*?)function SparkPlugs/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="valve"');
});

code = code.replace(/function SparkPlugs\(\) \{([\s\S]*?)function TimingCover/g, (match) => {
  return match.replace(/<EngineMaterial(?![\s\S]*?partId=)/g, '<EngineMaterial partId="sparkplug"');
});

// For SparkPlugs, there are some inline material edits in useFrame that we need to handle.
// In ModelParts.tsx:476 "mesh.material.emissiveIntensity = isSelected ? 0.4 + spark * 0.6 : spark * 0.8;"
// We don't have to touch it if it still references mesh.material.

fs.writeFileSync('src/components/model/ModelParts.tsx', code);
console.log('Successfully updated ModelParts.tsx');
