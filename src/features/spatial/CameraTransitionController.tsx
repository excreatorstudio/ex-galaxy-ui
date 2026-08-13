import { useFrame } from '@react-three/fiber'
import { sceneTransitionConfig, getTransitionProgress, getTransitionVariant } from '../../config/sceneTransitionConfig'
import { getTransitionDebugConfig } from '../transition/transitionTrajectories'
import { useGalaxyStore } from '../../state/useGalaxyStore'
import { spatialMotion } from './spatialMotion'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp01(value); return t * t * (3 - 2 * t) }
const mix = (from: number, to: number, amount: number) => from + (to - from) * smooth(amount)

export function CameraTransitionController() {
  const { sceneTransition, sceneTransitionStartedAt, motionOff } = useGalaxyStore()
  const debug = getTransitionDebugConfig(import.meta.env.DEV, window.location.search)
  useFrame(() => {
    if (!sceneTransition || !sceneTransitionStartedAt || motionOff) { spatialMotion.cameraZ = 0; spatialMotion.coreScale = 1; spatialMotion.coreEnergy = 1.5; spatialMotion.transitionProgress = 0; return }
    const progress = getTransitionProgress(sceneTransitionStartedAt, Date.now(), false, debug.playbackRate)
    const phases = sceneTransitionConfig.phases; const variant = getTransitionVariant(sceneTransition)
    spatialMotion.transitionProgress = progress
    if (sceneTransition === 'return') {
      spatialMotion.cameraZ = progress < phases.rushEnd ? mix(0, variant.dollyAtCommit, progress / phases.rushEnd) : mix(variant.dollyAtCommit, variant.settle, (progress - phases.rushEnd) / (1 - phases.rushEnd))
      spatialMotion.coreScale = progress < phases.rushEnd ? mix(1.16, .88, progress / phases.rushEnd) : mix(.88, .98, (progress - phases.rushEnd) / (1 - phases.rushEnd))
      spatialMotion.coreEnergy = 1.32
      return
    }
    spatialMotion.cameraZ = progress < phases.compressionEnd
      ? mix(0, variant.pullback, progress / phases.compressionEnd)
      : progress < phases.rushEnd
        ? mix(variant.pullback, variant.dollyAtCommit, (progress - phases.compressionEnd) / (phases.rushEnd - phases.compressionEnd))
        : mix(variant.dollyAtCommit, variant.settle, (progress - phases.rushEnd) / (1 - phases.rushEnd))
    spatialMotion.coreScale = progress < phases.compressionEnd
      ? mix(1, .76, progress / phases.compressionEnd)
      : progress < phases.rushEnd
        ? mix(.76, sceneTransition === 'focus' ? 1.12 : 1.04, (progress - phases.compressionEnd) / (phases.rushEnd - phases.compressionEnd))
        : mix(sceneTransition === 'focus' ? 1.12 : 1.04, 1, (progress - phases.rushEnd) / (1 - phases.rushEnd))
    spatialMotion.coreEnergy = sceneTransition === 'focus' ? 2.4 : 1.95
  })
  return null
}
