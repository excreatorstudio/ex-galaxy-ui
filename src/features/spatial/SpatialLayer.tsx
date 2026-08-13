import { lazy, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { SpatialErrorBoundary } from './SpatialErrorBoundary'
import { currentSpatialCapability } from './spatialCapability'

const SpatialCanvas = lazy(() => import('./SpatialCanvas').then(({ SpatialCanvas: Canvas }) => ({ default: Canvas })))

export function SpatialLayer() {
  const setSpatialDiagnostic = useGalaxyStore((state) => state.setSpatialDiagnostic)
  const capability = useMemo(() => currentSpatialCapability(), [])
  const markLazyLoaded = useCallback(() => setSpatialDiagnostic({ lazyLoaded: true }), [setSpatialDiagnostic])
  const activateFallback = useCallback((error: Error) => setSpatialDiagnostic({ mounted: false, fallbackActive: true, error: error.message || 'spatial-render-failed' }), [setSpatialDiagnostic])
  useEffect(() => {
    setSpatialDiagnostic({ requested: capability.request, webglAvailable: capability.webglAvailable, quality: capability.quality, fallbackActive: !capability.enabled, error: capability.enabled ? null : capability.reason })
  }, [capability, setSpatialDiagnostic])
  if (!capability.enabled) return null
  return <SpatialErrorBoundary onFallback={activateFallback}>
    <Suspense fallback={null}><SpatialCanvas capability={capability} onLazyLoaded={markLazyLoaded} /></Suspense>
  </SpatialErrorBoundary>
}
