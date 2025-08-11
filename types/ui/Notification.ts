/**
 * Notification.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definition for in-app notification data structure.
 */

type Notification = {
  id: string
  title: string
  description: string
  date: Date
  read: boolean
}

export default Notification
