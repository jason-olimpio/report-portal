/**
 * index.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Main export file for the config module.
 */

import {MAPTILER_API_KEY} from '@env'

export const mapConfig = {
  maptilerStyleUrl: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`,
}

export {default as appColors} from './colors'
export * from './apiConfig'
