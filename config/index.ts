import {MAPTILER_API_KEY} from '@env'

const rawKey =
  typeof MAPTILER_API_KEY === 'string' ? MAPTILER_API_KEY.trim() : ''

const hasRealKey =
  rawKey.length > 0 && rawKey !== 'undefined' && rawKey !== 'null'

const MAPTILER_STYLE = 'https://api.maptiler.com/maps/basic-v2/style.json'
const FALLBACK_STYLE = 'https://demotiles.maplibre.org/style.json'

export const mapConfig = {
  maptilerStyleUrl: hasRealKey
    ? `${MAPTILER_STYLE}?key=${encodeURIComponent(rawKey)}`
    : FALLBACK_STYLE,
}

export {default as appColors} from './colors'
export * from './apiConfig'
