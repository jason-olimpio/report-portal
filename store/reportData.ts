import {
  BulkyWasteDisposalImage,
  BuildingMaterialsDisposalImage,
  ElectricalWasteDisposalImage,
} from '@assets';

import { Report, StatusOption } from '@types';

const REPORTS: Report[] = [
  {
    image: BulkyWasteDisposalImage,
    title: 'Rifiuti ingombranti',
    address: 'Via Torino 45',
    date: new Date('2025-05-26T14:30:00'),
    status: StatusOption.Pending,
  },
  {
    image: BuildingMaterialsDisposalImage,
    title: 'Materiali edili',
    address: 'Piazza Duomo 12',
    date: new Date('2025-05-25T14:30:00'),
    status: StatusOption.Working,
  },
  {
    image: ElectricalWasteDisposalImage,
    title: 'Rifiuti elettrici',
    address: 'Via Montenapoleone 8',
    date: new Date('2025-05-23T14:30:00'),
    status: StatusOption.Completed,
  },
];

export default REPORTS;

