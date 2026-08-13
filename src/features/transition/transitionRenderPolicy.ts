/** WebGL owns large shards when available; CSS retains the complete fallback otherwise. */
export const shouldRenderCssTransitionFragments = (spatialActive: boolean, motionOff: boolean) => !spatialActive && !motionOff
