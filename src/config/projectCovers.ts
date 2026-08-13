const projectCover = (name: string) => `${import.meta.env.BASE_URL}assets/galaxy/project-covers/${name}`

/** Public static covers; the card-art gradient remains visible whenever an image cannot load. */
export const projectCovers = {
  film: projectCover('film-cover.png'),
  campaign: projectCover('campaign-cover.png'),
  reel: projectCover('reel-cover.png'),
  ai: projectCover('ai-visual-cover.png'),
  audio: projectCover('audio-cover.png'),
} as const
