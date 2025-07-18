import {MAPTILER_API_KEY} from '@env';

export const mapConfig = {
  maptilerStyleUrl: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`,
};

export {default as appColors} from './colors';
export * from './apiConfig';
