import { Component, type ErrorInfo, type ReactNode } from 'react'

interface SpatialErrorBoundaryProps { children: ReactNode; onFallback: (error: Error) => void }
interface SpatialErrorBoundaryState { failed: boolean }

/** Fails closed: the CSS galaxy remains mounted outside this boundary. */
export class SpatialErrorBoundary extends Component<SpatialErrorBoundaryProps, SpatialErrorBoundaryState> {
  state: SpatialErrorBoundaryState = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Spatial layer disabled; CSS fallback remains active.', error, info)
    this.props.onFallback(error)
  }
  render() { return this.state.failed ? null : this.props.children }
}
