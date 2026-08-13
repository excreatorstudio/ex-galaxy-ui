export type SpatialRequest = 'auto' | 'off' | 'low'

export interface SpatialCapability {
  request: SpatialRequest
  enabled: boolean
  safeMode: boolean
  quality: 'high' | 'balanced' | 'low'
  isMobile: boolean
  webglAvailable: boolean
  maxTextureSize: number | null
  reason: string
}

interface CapabilityEnvironment {
  search: string
  userAgent: string
  viewportWidth: number
  reducedMotion: boolean
  deviceMemory?: number
  hardwareConcurrency?: number
  probeWebGL: () => { available: boolean; maxTextureSize: number | null }
}

export function getSpatialRequest(search: string): SpatialRequest {
  const value = new URLSearchParams(search).get('spatial')
  return value === 'off' || value === 'low' ? value : 'auto'
}

export function probeWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) || canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })
    if (!context) return { available: false, maxTextureSize: null }
    const maxTextureSize = context.getParameter(context.MAX_TEXTURE_SIZE) as number
    context.getExtension('WEBGL_lose_context')?.loseContext()
    return { available: Number.isFinite(maxTextureSize) && maxTextureSize >= 1024, maxTextureSize }
  } catch {
    return { available: false, maxTextureSize: null }
  }
}

export function assessSpatialCapability(environment: CapabilityEnvironment): SpatialCapability {
  const request = getSpatialRequest(environment.search)
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(environment.userAgent) || environment.viewportWidth <= 680
  const probe = environment.probeWebGL()
  const lowMemory = environment.deviceMemory !== undefined && environment.deviceMemory <= 2
  const lowCpu = environment.hardwareConcurrency !== undefined && environment.hardwareConcurrency <= 4
  const constrained = lowMemory || lowCpu || (probe.maxTextureSize !== null && probe.maxTextureSize < 4096)
  if (request === 'off') return { request, enabled: false, safeMode: true, quality: 'low', isMobile, webglAvailable: probe.available, maxTextureSize: probe.maxTextureSize, reason: 'forced-off' }
  if (!probe.available) return { request, enabled: false, safeMode: true, quality: 'low', isMobile, webglAvailable: false, maxTextureSize: probe.maxTextureSize, reason: 'webgl-unavailable' }
  if (environment.reducedMotion && request === 'auto') return { request, enabled: false, safeMode: true, quality: 'low', isMobile, webglAvailable: true, maxTextureSize: probe.maxTextureSize, reason: 'reduced-motion' }
  if (isMobile && constrained && request === 'auto') return { request, enabled: false, safeMode: true, quality: 'low', isMobile, webglAvailable: true, maxTextureSize: probe.maxTextureSize, reason: 'mobile-capability-fallback' }
  const safeMode = request === 'low' || isMobile
  return { request, enabled: true, safeMode, quality: safeMode ? 'low' : 'balanced', isMobile, webglAvailable: true, maxTextureSize: probe.maxTextureSize, reason: safeMode ? 'safe-mode' : 'spatial-ready' }
}

export function currentSpatialCapability() {
  const nav = navigator as Navigator & { deviceMemory?: number }
  return assessSpatialCapability({
    search: window.location.search,
    userAgent: navigator.userAgent,
    viewportWidth: window.innerWidth,
    reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    probeWebGL,
  })
}
