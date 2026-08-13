import { create } from 'zustand'
import type { AppPhase, CoreActivationMode, CoreActivationState, ExperienceMode, Language, Quality, SceneTransitionKind, SpatialDiagnostic, WorkflowStatus } from '../types'
import { coreActivationConfig, getCoreActivationTiming } from '../config/coreActivationConfig'
import { getInitialLocale } from '../i18n/localeStore'
import type { PlatformPanel } from '../services/platform/types'

interface GalaxyState {
  phase: AppPhase; experienceMode: ExperienceMode; language: Language; quality: Quality; motionOff: boolean; loadingRun: number
  selectedModule: string | null; workflow: WorkflowStatus; workflowStep: number; presentation: boolean; presentationPaused: boolean; exported: boolean
  sceneTransition: SceneTransitionKind | null; sceneTransitionStartedAt: number | null; pendingModule: string | null
  projectCoreActivationState: CoreActivationState; projectCoreActivationMode: CoreActivationMode; projectCoreActivationStartedAt: number | null; projectCoreActivationPausedAt: number | null; projectCoreActivationDurationMs: number; projectCoreActivationReduced: boolean
  spatialActive: boolean
  spatialDiagnostic: SpatialDiagnostic
  platformPanel: PlatformPanel | null; platformRefresh: number
  completeLoading: () => void; awaken: () => void; focus: (id: string) => void; back: () => void
  transitionAwaken: () => void; transitionFocus: (id: string) => void; transitionBack: () => void; commitSceneTransition: () => void; clearSceneTransition: () => void
  startProjectCoreActivation: (mode?: CoreActivationMode) => void; completeProjectCoreActivation: () => void; resetProjectCoreActivation: () => void
  returnToIdle: () => void; restartGalaxyExperience: () => void; startPresentation: () => void; restartPresentation: () => void; exitPresentation: () => void
  setLanguage: (lang: Language) => void; setQuality: (quality: Quality) => void; toggleMotion: () => void
  setSpatialActive: (active: boolean) => void
  setSpatialDiagnostic: (diagnostic: Partial<SpatialDiagnostic>) => void
  openPlatformPanel: (panel: PlatformPanel) => void; closePlatformPanel: () => void; refreshPlatformData: () => void
  setWorkflow: (status: WorkflowStatus, step?: number) => void; setPresentationPaused: (paused: boolean) => void; setExported: (value: boolean) => void; reset: () => void
}

const cleanProjectActivation = { projectCoreActivationState: 'idle' as CoreActivationState, projectCoreActivationMode: 'full' as CoreActivationMode, projectCoreActivationStartedAt: null, projectCoreActivationPausedAt: null, projectCoreActivationDurationMs: coreActivationConfig.normal.durationMs, projectCoreActivationReduced: false }
const cleanManual = { selectedModule: null, workflow: 'idle' as WorkflowStatus, workflowStep: -1, exported: false, sceneTransition: null, sceneTransitionStartedAt: null, pendingModule: null, ...cleanProjectActivation }
const isActivationMobile = () => typeof window !== 'undefined' && (window.matchMedia?.('(max-width: 680px)').matches ?? false)
const startActivation = (motionOff: boolean, mode: CoreActivationMode, paused = false) => {
  const timing = getCoreActivationTiming(mode, motionOff, isActivationMobile()); const startedAt = Date.now()
  return { projectCoreActivationState: 'playing' as CoreActivationState, projectCoreActivationMode: mode, projectCoreActivationStartedAt: startedAt, projectCoreActivationPausedAt: paused ? startedAt : null, projectCoreActivationDurationMs: timing.durationMs, projectCoreActivationReduced: timing.reduced }
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  phase: 'loading', experienceMode: 'manual', language: getInitialLocale(), quality: 'balanced', motionOff: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, loadingRun: 0,
  ...cleanManual, presentation: false, presentationPaused: false, spatialActive: false, spatialDiagnostic: { requested: 'auto', webglAvailable: false, quality: 'balanced', lazyLoaded: false, mounted: false, fallbackActive: true, error: null }, platformPanel: null, platformRefresh: 0,
  completeLoading: () => set((state) => state.phase === 'loading' ? { phase: 'idle', ...cleanProjectActivation } : {}),
  awaken: () => set((state) => state.phase === 'idle' ? { phase: 'awakened' } : {}),
  focus: (id) => set((state) => state.phase === 'awakened' ? { phase: 'module-focus', selectedModule: id } : {}),
  back: () => set((state) => state.phase === 'module-focus' ? { phase: 'awakened', ...cleanManual } : {}),
  transitionAwaken: () => set((state) => state.phase === 'idle' && !state.sceneTransition ? { sceneTransition: 'awaken', sceneTransitionStartedAt: Date.now() } : {}),
  transitionFocus: (id) => set((state) => state.phase === 'awakened' && !state.sceneTransition ? { sceneTransition: 'focus', sceneTransitionStartedAt: Date.now(), pendingModule: id } : {}),
  transitionBack: () => set((state) => state.phase === 'module-focus' && !state.sceneTransition ? { sceneTransition: 'return', sceneTransitionStartedAt: Date.now() } : {}),
  commitSceneTransition: () => set((state) => {
    if (state.sceneTransition === 'awaken' && state.phase === 'idle') return { phase: 'awakened' }
    if (state.sceneTransition === 'focus' && state.phase === 'awakened' && state.pendingModule) return { phase: 'module-focus', selectedModule: state.pendingModule, pendingModule: null }
    if (state.sceneTransition === 'return' && state.phase === 'module-focus') return { phase: 'awakened', selectedModule: null, workflow: 'idle', workflowStep: -1, exported: false, ...cleanProjectActivation }
    return {}
  }),
  clearSceneTransition: () => set({ sceneTransition: null, sceneTransitionStartedAt: null, pendingModule: null }),
  startProjectCoreActivation: (mode = 'full') => set((state) => state.phase === 'module-focus' && state.selectedModule === 'video-studio' ? startActivation(state.motionOff, mode, state.presentation && state.presentationPaused) : {}),
  completeProjectCoreActivation: () => set((state) => state.projectCoreActivationState === 'playing' ? { projectCoreActivationState: 'complete' } : {}),
  resetProjectCoreActivation: () => set(cleanProjectActivation),
  returnToIdle: () => set({ phase: 'idle', ...cleanManual }),
  restartGalaxyExperience: () => set((state) => state.phase === 'loading' ? {} : { phase: 'loading', experienceMode: 'manual', presentation: false, presentationPaused: false, platformPanel: null, loadingRun: state.loadingRun + 1, ...cleanManual }),
  startPresentation: () => set({ phase: 'loading', experienceMode: 'presentation', presentation: true, presentationPaused: false, platformPanel: null, ...cleanManual }),
  restartPresentation: () => set({ phase: 'loading', experienceMode: 'presentation', presentation: true, presentationPaused: false, platformPanel: null, ...cleanManual }),
  exitPresentation: () => set({ phase: 'idle', experienceMode: 'manual', presentation: false, presentationPaused: false, platformPanel: null, ...cleanManual }),
  setLanguage: (language) => set({ language }), setQuality: (quality) => set({ quality }), toggleMotion: () => set((state) => ({ motionOff: !state.motionOff })),
  setSpatialActive: (spatialActive) => set({ spatialActive }),
  setSpatialDiagnostic: (diagnostic) => set((state) => ({ spatialDiagnostic: { ...state.spatialDiagnostic, ...diagnostic } })),
  openPlatformPanel: (platformPanel) => set({ platformPanel }), closePlatformPanel: () => set({ platformPanel: null }), refreshPlatformData: () => set((state) => ({ platformRefresh: state.platformRefresh + 1 })),
  setWorkflow: (workflow, workflowStep = -1) => set({ workflow, workflowStep }),
  setPresentationPaused: (presentationPaused) => set((state) => {
    if (!state.presentation || state.projectCoreActivationState !== 'playing') return { presentationPaused }
    if (presentationPaused && !state.projectCoreActivationPausedAt) return { presentationPaused: true, projectCoreActivationPausedAt: Date.now() }
    if (!presentationPaused && state.projectCoreActivationPausedAt && state.projectCoreActivationStartedAt) return { presentationPaused: false, projectCoreActivationStartedAt: state.projectCoreActivationStartedAt + Date.now() - state.projectCoreActivationPausedAt, projectCoreActivationPausedAt: null }
    return { presentationPaused }
  }), setExported: (exported) => set({ exported }),
  reset: () => set({ phase: 'loading', experienceMode: 'manual', presentation: false, presentationPaused: false, platformPanel: null, platformRefresh: 0, ...cleanManual }),
}))
