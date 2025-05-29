import {
  BulkyWasteDisposalImage,
  BuildingMaterialsDisposalImage,
  ElectricalWasteDisposalImage,
} from '@assets';

import { Report, ReportStatus } from '@types';

const REPORTS: Report[] = [
  {
    image: BulkyWasteDisposalImage,
    title: 'Rifiuti ingombranti',
    address: 'Via Torino 45',
    date: new Date('2025-05-26T14:30:00'),
    status: ReportStatus.Pending,
  },
  {
    image: BuildingMaterialsDisposalImage,
    title: 'Materiali edili',
    address: 'Piazza Duomo 12',
    date: new Date('2025-05-25T14:30:00'),
    status: ReportStatus.Working,
  },
  {
    image: ElectricalWasteDisposalImage,
    title: 'Rifiuti elettrici',
    address: 'Via Montenapoleone 8',
    date: new Date('2025-05-23T14:30:00'),
    status: ReportStatus.Completed,
  },
];

export default REPORTS;

