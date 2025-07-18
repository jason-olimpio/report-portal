import NetInfo from '@react-native-community/netinfo';

const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();

  return !!state.isConnected;
};

export default isOnline;
