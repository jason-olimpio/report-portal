import type {Notification} from '@types'

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome!',
    description: 'Thank you for installing the app.',
    date: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'New report available',
    description: 'A new report has been published.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: '3',
    title: 'System update',
    description: 'The system will be under maintenance tomorrow from 10:00 PM.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: '4',
    title: 'New feature',
    description: 'You can now filter reports by date.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
  {
    id: '5',
    title: 'Reminder',
    description: 'Don’t forget to update your profile.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
  {
    id: '6',
    title: 'Collection reminder',
    description: 'Remember that plastic collection is scheduled for tomorrow.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    read: false,
  },
  {
    id: '7',
    title: 'Important message',
    description: 'Please update the app to continue receiving notifications.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: false,
  },
  {
    id: '8',
    title: 'Upcoming event',
    description:
      'Join the webinar on environmental sustainability on July 10th.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
  },
  {
    id: '9',
    title: 'Privacy update',
    description: 'We have updated our privacy policy. Read what’s new.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: true,
  },
  {
    id: '10',
    title: 'New badge earned',
    description:
      'Congratulations! You have earned the “Virtuous Citizen” badge for your activity.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: false,
  },
  {
    id: '11',
    title: 'Service suspended',
    description:
      'Paper collection service will be suspended on July 5th due to a holiday.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    read: false,
  },
  {
    id: '12',
    title: 'New recycling area',
    description: 'A new recycling area has opened at 12 Roma Street.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 1 day and 6 hours ago
    read: false,
  },
  {
    id: '13',
    title: 'Special collection',
    description: 'Special bulky waste collection next Saturday.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 200), // 8 days ago
    read: true,
  },
  {
    id: '14',
    title: 'Important notice',
    description: 'Attention: possible collection delays due to roadworks.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 hours ago
    read: false,
  },
  {
    id: '15',
    title: 'Tip',
    description: 'Check the FAQ section to solve common doubts.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 60), // 2 days and 12 hours ago
    read: true,
  },
]

export default notifications
