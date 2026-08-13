import { sceneTransitionConfig } from './sceneTransitionConfig'

export const galaxyConfig = {
  loadingDurationMs: 4200,
  loadingTickMs: 80,
  inputTapThresholdPx: 12,
  awakenTransitionMs: 1800,
  sceneTransitionMs: sceneTransitionConfig.normal.durationMs,
  sceneTransitionCommitMs: sceneTransitionConfig.normal.commitMs,
  sceneTransitionReducedMs: sceneTransitionConfig.reduced.durationMs,
  sceneTransitionReducedCommitMs: sceneTransitionConfig.reduced.commitMs,
  presentationIdleHoldMs: 2400,
  presentationActivationSettleMs: 700,
  presentationChapterMs: 5000,
  stars: { high: 190, balanced: 115, low: 55 },
  parallaxMax: 18,
  workflowStepMs: 2400,
}
export const workflowSteps = ['Scanning media', 'Detecting scenes', 'Classifying content', 'Analyzing visual quality', 'Building story structure', 'Selecting best shots', 'Creating timeline', 'Generating subtitles', 'Matching soundtrack', 'Applying transitions', 'Adding logo', 'Running quality check', 'Project ready']
