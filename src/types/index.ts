export type AppPhase = 'loading' | 'idle' | 'awakened' | 'module-focus'
export type ExperienceMode = 'manual' | 'presentation'
export type Language = 'zh-TW' | 'en' | 'ja' | 'ko'
export type Quality = 'high' | 'balanced' | 'low'
export type WorkflowStatus = 'idle' | 'ready' | 'analyzing' | 'building' | 'completed' | 'exporting'
export type SceneTransitionKind = 'awaken' | 'focus' | 'return'
export type CoreActivationState = 'idle' | 'playing' | 'complete'
export type CoreActivationMode = 'full' | 'reconnect'
export interface SpatialDiagnostic { requested: 'auto' | 'off' | 'low'; webglAvailable: boolean; quality: 'high' | 'balanced' | 'low'; lazyLoaded: boolean; mounted: boolean; fallbackActive: boolean; error: string | null }
export interface SpatialMotionState { cameraZ: number; cameraX: number; cameraY: number; cameraWorldZ: number; coreScale: number; coreEnergy: number; transitionProgress: number; primaryShardZ: number; nearPlaneCrossed: boolean }
export type ModuleStatus = 'AVAILABLE / PROTOTYPE' | 'COMING SOON'
export interface GalaxyModule { id: string; translationKey: string; name: string; shortName: string; description: string; status: ModuleStatus; available: boolean; theme: string; position: [number, number]; scale: number; route: string; icon: string; accent: string; featureNodes: string[] }
export interface MediaAsset { id: string; name: string; type: 'VIDEO' | 'AUDIO' | 'LOGO'; duration: string; accent: string }
