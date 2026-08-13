import { backendConfig, remoteModeNotice } from '../../config/backendConfig'
import { mockPlatformAdapters } from './mockPlatformAdapters'
import type { PlatformAdapters } from './types'

let warnedRemote = false

/** UI code consumes this adapter boundary, never mock fixtures directly. */
export function getPlatformService(): PlatformAdapters {
  if (backendConfig.mode === 'remote' && !warnedRemote) {
    warnedRemote = true
    if (import.meta.env.DEV) console.warn(remoteModeNotice)
  }
  return mockPlatformAdapters
}

export function resetPlatformDemo() {
  // Kept for future test/service lifecycle extensions; mock session is intentionally in-memory.
}
