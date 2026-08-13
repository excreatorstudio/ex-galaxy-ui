const galaxyAsset = (name: string) => `${import.meta.env.BASE_URL}assets/galaxy/${name}`

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
