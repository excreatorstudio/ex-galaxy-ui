export const designTokens = {
  color: { void: '#02040a', midnight: '#060a18', surface: 'rgba(10, 18, 42, .72)', line: 'rgba(173, 199, 255, .28)', ice: '#e8f1ff', mist: '#a9bde9', blue: '#86a8ff', violet: '#b69bf0', success: '#9ae5ca' },
  depth: { far: .32, mid: .62, near: .9, interface: 1 },
  motion: { reveal: 700, sceneTransition: 900, sceneCommit: 560, orbit: 16000, dataPulse: 1800, ease: [0.16, 1, 0.3, 1] },
  density: { high: 190, balanced: 115, low: 55 },
} as const
