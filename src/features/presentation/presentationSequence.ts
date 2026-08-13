import type { CoreActivationState } from '../../types'

// Presentation only waits for the Video Studio Creative Orbit activation, never the Galaxy Hero.
export const shouldHoldPresentationForActivation = (chapter: number, state: CoreActivationState) => chapter === 4 && state !== 'complete'
