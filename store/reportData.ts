import {
  BulkyWasteDisposalImage,
  BuildingMaterialsDisposalImage,
  ElectricalWasteDisposalImage,
} from '@assets';

import { Report, StatusOption, PriorityOption } from '@types';

const REPORTS: Report[] = [
  {
    id: '1',
    image: BulkyWasteDisposalImage,
    title: 'Rifiuti ingombranti',
    description: 'Abbandono di rifiuti ingombranti sul marciapiede. Necessaria rimozione urgente.',
    address: 'Via Torino 45',
    date: new Date('2025-05-26T14:30:00'),
    status: StatusOption.Pending,
    priority: PriorityOption.High,
  },
  {
    id: '2',
    image: BuildingMaterialsDisposalImage,
    title: 'Materiali edili',
    description: 'Materiali edili abbandonati dopo lavori di ristrutturazione. Occupano parte della strada.',
    address: 'Piazza Duomo 12',
    date: new Date('2025-05-25T14:30:00'),
    status: StatusOption.Working,
    priority: PriorityOption.Medium,
  },
  {
    id: '3',
    image: ElectricalWasteDisposalImage,
    title: 'Rifiuti elettrici',
    description: 'Elettrodomestici e apparecchiature elettroniche abbandonate. Potenziale rischio ambientale.',
    address: 'Via Montenapoleone 8',
    date: new Date('2025-05-23T14:30:00'),
    status: StatusOption.Completed,
    priority: PriorityOption.Low,
  },
];

export default REPORTS;
