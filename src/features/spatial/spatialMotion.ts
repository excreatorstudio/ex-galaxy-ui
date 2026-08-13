import type { SpatialMotionState } from '../../types'

/** One Canvas owns this runtime-only motion vector; it never changes application phase. */
export const spatialMotion: SpatialMotionState = { cameraZ: 0, cameraX: 0, cameraY: 0, cameraWorldZ: 12, coreScale: 1, coreEnergy: 1.5, transitionProgress: 0, primaryShardZ: -4.6, nearPlaneCrossed: false }
