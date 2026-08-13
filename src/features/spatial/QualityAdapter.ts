import type { Quality } from '../../types'

export interface SpatialQualityPreset {
  dpr: [number, number]
  farStars: number
  midStars: number
  nearStars: number
  dust: number
  shards: number
}

const presets: Record<Quality, SpatialQualityPreset> = {
  high: { dpr: [1, 1.75], farStars: 1100, midStars: 620, nearStars: 220, dust: 330, shards: 14 },
  balanced: { dpr: [1, 1.35], farStars: 720, midStars: 390, nearStars: 140, dust: 190, shards: 12 },
  low: { dpr: [0.75, 1], farStars: 280, midStars: 150, nearStars: 55, dust: 75, shards: 7 },
}

export function getSpatialQuality(quality: Quality, mobile: boolean, forceLow = false): SpatialQualityPreset {
  if (!mobile && !forceLow) return presets[quality]
  const low = presets.low
  return { ...low, dpr: [0.75, 1], shards: Math.min(low.shards, 6), dust: 52 }
}
