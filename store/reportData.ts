import {
  EquipmentFailureImage,
  SafetyHazardImage,
  FacilityRepairImage,
  TechMaintenanceImage,
} from '@assets'

import {type Report, StatusOption, PriorityOption} from '@types'

const BASE_REPORTS: Report[] = [
  {
    id: '1',
    images: [TechMaintenanceImage],
    title: 'Server Rack Overheating',
    description:
      'Ventilation unit failure in Rack 4B. Temperature reaching critical levels.',
    address: 'Data Center - Sector A',
    location: {latitude: 45.4654, longitude: 9.1859},
    date: new Date('2026-02-24T09:00:00'),
    status: StatusOption.Pending,
    priority: PriorityOption.High,
  },
  {
    id: '2',
    images: [SafetyHazardImage],
    title: 'Exposed High-Voltage Wiring',
    description:
      'Protective casing damaged during equipment move. Immediate cordoning required.',
    address: 'Manufacturing Floor - Bay 3',
    location: {latitude: 45.464, longitude: 9.19},
    date: new Date('2026-02-24T10:15:00'),
    status: StatusOption.Working,
    priority: PriorityOption.High,
  },
  {
    id: '3',
    images: [EquipmentFailureImage],
    title: 'Hydraulic Press Leak',
    description: 'Slow fluid leak detected near the primary piston seal.',
    address: 'Assembly Line 12',
    location: {latitude: 45.4685, longitude: 9.195},
    date: new Date('2026-02-23T14:30:00'),
    status: StatusOption.Completed,
    priority: PriorityOption.Medium,
  },
  {
    id: '4',
    images: [FacilityRepairImage],
    title: 'Loading Dock Door Jam',
    description:
      'Motor is struggling to lift the external shutter. Safety sensor is flickering.',
    address: 'Logistics Hub - Gate 2',
    location: {latitude: 45.4692, longitude: 9.1834},
    date: new Date('2026-02-23T16:00:00'),
    status: StatusOption.Pending,
    priority: PriorityOption.Medium,
  },
  {
    id: '5',
    images: [TechMaintenanceImage],
    title: 'Main Lobby Access Panel',
    description: 'Biometric reader is not syncing with the security database.',
    address: 'Headquarters Entrance',
    location: {latitude: 45.4655, longitude: 9.1921},
    date: new Date('2026-02-22T08:45:00'),
    status: StatusOption.Working,
    priority: PriorityOption.Low,
  },
]

const CATEGORIES = [
  {
    title: 'Air Filtration Blocked',
    img: FacilityRepairImage,
    priority: PriorityOption.Low,
  },
  {
    title: 'Conveyor Belt Misalignment',
    img: EquipmentFailureImage,
    priority: PriorityOption.High,
  },
  {
    title: 'Emergency Exit Light Dim',
    img: SafetyHazardImage,
    priority: PriorityOption.Medium,
  },
  {
    title: 'Workstation Power Failure',
    img: TechMaintenanceImage,
    priority: PriorityOption.Medium,
  },
  {
    title: 'Chemical Spill Kit Empty',
    img: SafetyHazardImage,
    priority: PriorityOption.High,
  },
]

const GENERATED_REPORTS: Report[] = Array.from({length: 25}).map((_, i) => {
  const id = (i + 6).toString()
  const category = CATEGORIES[i % CATEGORIES.length]

  return {
    id,
    images: [category.img],
    title: `${category.title} #${id}`,
    description: `Periodic inspection report regarding ${category.title.toLowerCase()}. Standard maintenance required.`,
    address: `Zone ${String.fromCharCode(65 + (i % 8))}, Station ${200 + i}`,
    location: {
      latitude: 45.46 + Math.random() * 0.02,
      longitude: 9.18 + Math.random() * 0.02,
    },
    date: new Date(Date.now() - i * 10800000), // Spread back over days
    status:
      i % 3 === 0
        ? StatusOption.Pending
        : i % 3 === 1
          ? StatusOption.Working
          : StatusOption.Completed,
    priority: category.priority,
  }
})

const REPORTS: Report[] = [...BASE_REPORTS, ...GENERATED_REPORTS]

export default REPORTS
