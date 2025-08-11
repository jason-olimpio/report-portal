/**
 * userData.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Mock user data. Contains sample user
 * information including IDs, names, and points for leaderboard display.
 */

import type {User} from '@types'

const userData: User[] = [
  {id: '1', name: 'Alice Red', points: 120},
  {id: '2', name: 'Bob White', points: 95},
  {id: '3', name: 'Carla Green', points: 80},
  {id: '4', name: 'Dario Black', points: 60},
  {id: '5', name: 'Elena Blue', points: 40},
]

export default userData
