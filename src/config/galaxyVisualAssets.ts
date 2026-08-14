const galaxyAsset = (name: string) => `${import.meta.env.BASE_URL}assets/galaxy/${name}`

/** CSS custom-property URLs otherwise resolve relative to the emitted CSS file. */
export const resolveGalaxyAssetUrl = (asset: string) => typeof document === 'undefined' ? asset : new URL(asset, document.baseURI).href

/** Public, relative asset paths remain portable for GitHub Pages project sites and LAN hosts. */
export const galaxyVisualAssets = {
  entry: galaxyAsset('reference/galaxy-master-composite.png'),
  home: galaxyAsset('reference/galaxy-home-master-composite.png'),
  base: galaxyAsset('core-visual/galaxy-background-base.png'),
  nebula: galaxyAsset('core-visual/galaxy-nebula-glow.png'),
  orbits: galaxyAsset('core-visual/galaxy-orbit-rings.png'),
  coreGlow: galaxyAsset('core-visual/galaxy-core-glow.png'),
  coreParticles: galaxyAsset('core-visual/galaxy-core-particles.png'),
  exOutline: galaxyAsset('core-visual/galaxy-ex-outline.png'),
  stars: galaxyAsset('core-visual/galaxy-stars-foreground.png'),
  atmosphere: galaxyAsset('core-visual/galaxy-atmosphere-overlay.png'),
}

export type GalaxySceneAssetKey = keyof typeof galaxyVisualAssets

/**
 * The three runtime scene contracts deliberately do not share visibility rules.
 * `entry` and `home` are opaque finished artwork; the remaining keys are the
 * transparent core-visual layers. Keeping the mapping data-driven makes the
 * source-of-truth testable without coupling it to the Video Studio clock.
 */
export const galaxySceneAssetMapping = {
  idle: {
    composite: 'entry',
    layers: ['stars', 'atmosphere'],
    fallback: 'procedural-css',
  },
  homepage: {
    composite: 'home',
    layers: ['base', 'nebula', 'orbits', 'coreGlow', 'coreParticles', 'exOutline', 'stars', 'atmosphere'],
    fallback: 'procedural-css',
  },
  videoStudio: {
    composite: null,
    layers: ['base', 'nebula', 'orbits', 'stars', 'atmosphere'],
    fallback: 'procedural-css',
  },
} as const

export type GalaxySceneName = keyof typeof galaxySceneAssetMapping
