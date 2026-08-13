import { useGalaxyStore } from '../../state/useGalaxyStore'

export function BootDiagnostics() {
  const diagnostics = useGalaxyStore((state) => state.spatialDiagnostic)
  const enabled = import.meta.env.DEV && new URLSearchParams(window.location.search).get('bootDebug') === '1'
  if (!enabled) return null
  return <aside className="boot-diagnostics" aria-live="polite">
    <b>BOOT DIAGNOSTICS</b>
    <span>App mounted: yes</span><span>Spatial requested: {diagnostics.requested}</span><span>WebGL available: {String(diagnostics.webglAvailable)}</span>
    <span>Quality selected: {diagnostics.quality}</span><span>Lazy chunk loaded: {String(diagnostics.lazyLoaded)}</span><span>Spatial mounted: {String(diagnostics.mounted)}</span>
    <span>Fallback active: {String(diagnostics.fallbackActive)}</span><span>Error: {diagnostics.error ?? 'none'}</span>
  </aside>
}
