/**
 * isOnline.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Utility function for checking network connectivity.
 */

import NetInfo from '@react-native-community/netinfo'

const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch()

  return !!state.isConnected
}

export default isOnline
