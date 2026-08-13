import { useEffect } from 'react'
import { useGalaxyStore } from '../../state/useGalaxyStore'

/** Completes the Video Studio core timeline without coupling it to the Galaxy Hero. */
export function ProjectCoreActivationController() {
  const { projectCoreActivationState, projectCoreActivationStartedAt, projectCoreActivationPausedAt, projectCoreActivationDurationMs, completeProjectCoreActivation } = useGalaxyStore()

  useEffect(() => {
    if (projectCoreActivationState !== 'playing' || !projectCoreActivationStartedAt || projectCoreActivationPausedAt) return
    const remaining = Math.max(0, projectCoreActivationDurationMs - (Date.now() - projectCoreActivationStartedAt))
    const timer = window.setTimeout(() => {
      const current = useGalaxyStore.getState()
      if (current.projectCoreActivationState === 'playing' && current.projectCoreActivationStartedAt === projectCoreActivationStartedAt) current.completeProjectCoreActivation()
    }, remaining)
    return () => window.clearTimeout(timer)
  }, [completeProjectCoreActivation, projectCoreActivationDurationMs, projectCoreActivationPausedAt, projectCoreActivationStartedAt, projectCoreActivationState])

  return null
}
