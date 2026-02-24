import type {Notification} from '@types'

const currentTimestamp = Date.now()

const createDateHoursAgo = (hoursAgo: number) =>
  new Date(currentTimestamp - 1000 * 60 * 60 * hoursAgo)

const createDateDaysAgo = (daysAgo: number) =>
  new Date(currentTimestamp - 1000 * 60 * 60 * 24 * daysAgo)

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome',
    description:
      'Your account is ready. Create your first report to get started.',
    date: createDateHoursAgo(1),
    read: false,
  },
  {
    id: '2',
    title: 'Report received',
    description: 'We saved your report and assigned it to the right team.',
    date: createDateHoursAgo(3),
    read: false,
  },
  {
    id: '3',
    title: 'Status update',
    description: 'Your report moved to Working.',
    date: createDateHoursAgo(6),
    read: false,
  },
  {
    id: '4',
    title: 'New comment',
    description: 'An operator asked for more details to confirm the issue.',
    date: createDateHoursAgo(10),
    read: false,
  },
  {
    id: '5',
    title: 'Action needed',
    description: 'Please confirm the address to avoid delays.',
    date: createDateHoursAgo(14),
    read: false,
  },
  {
    id: '6',
    title: 'Report resolved',
    description: 'Good news—your report was marked as Solved.',
    date: createDateDaysAgo(1),
    read: true,
  },
  {
    id: '7',
    title: 'Reminder',
    description: 'You have a pending report that needs your input.',
    date: createDateDaysAgo(1.5),
    read: true,
  },
  {
    id: '8',
    title: 'Service notice',
    description: 'Scheduled maintenance tonight from 22:00 to 23:00.',
    date: createDateDaysAgo(2),
    read: false,
  },
  {
    id: '9',
    title: 'New feature',
    description: 'You can now filter reports by status and date range.',
    date: createDateDaysAgo(3),
    read: true,
  },
  {
    id: '10',
    title: 'Badge earned',
    description: 'You earned “Virtuous Contributor” for consistent reporting.',
    date: createDateDaysAgo(4),
    read: false,
  },
  {
    id: '11',
    title: 'Saved offline',
    description:
      'No connection—your report was saved and will resend automatically.',
    date: createDateDaysAgo(5),
    read: true,
  },
  {
    id: '12',
    title: 'Privacy update',
    description: 'We updated our privacy policy. Tap to review changes.',
    date: createDateDaysAgo(7),
    read: true,
  },
]

export default notifications
