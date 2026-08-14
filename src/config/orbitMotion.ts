export type OrbitEnergyScene = 'idle' | 'homepage' | 'video-studio'

export type OrbitEnergyDirection = 'clockwise' | 'counter-clockwise'

export const orbitEnergyMotion = {
  viewBox: '0 0 1672 941',
  bitmapRotationEnabled: false,
  paths: [
    { id: 'a', d: 'M 144 470 C 318 205 1354 190 1538 470 C 1354 748 318 734 144 470 Z', durationSeconds: 18, pulseSeconds: 4.2, direction: 'clockwise' as OrbitEnergyDirection, delaySeconds: -3.4 },
    { id: 'b', d: 'M 220 642 C 334 218 1303 122 1451 312 C 1566 462 1214 704 623 748 C 354 768 154 708 220 642 Z', durationSeconds: 23, pulseSeconds: 5.6, direction: 'counter-clockwise' as OrbitEnergyDirection, delaySeconds: -9.1 },
    { id: 'c', d: 'M 294 214 C 596 62 1322 204 1412 504 C 1495 784 841 876 422 674 C 184 559 134 344 294 214 Z', durationSeconds: 29, pulseSeconds: 6.4, direction: 'clockwise' as OrbitEnergyDirection, delaySeconds: -15.2 },
    { id: 'd', d: 'M 828 70 C 1122 96 1308 327 1228 558 C 1140 815 838 906 591 777 C 340 647 384 354 589 168 C 658 106 741 65 828 70 Z', durationSeconds: 35, pulseSeconds: 3.7, direction: 'counter-clockwise' as OrbitEnergyDirection, delaySeconds: -7.8 },
    { id: 'e', d: 'M 418 100 C 840 45 1415 314 1314 594 C 1222 846 581 866 276 604 C 31 393 114 145 418 100 Z', durationSeconds: 42, pulseSeconds: 5.1, direction: 'clockwise' as OrbitEnergyDirection, delaySeconds: -24.3 },
    { id: 'f', d: 'M 1188 142 C 1460 309 1458 626 1196 770 C 880 942 273 730 261 455 C 252 230 790 -30 1188 142 Z', durationSeconds: 51, pulseSeconds: 6.8, direction: 'counter-clockwise' as OrbitEnergyDirection, delaySeconds: -30.5 },
  ],
  scenes: {
    idle: { pathCount: 5, sparkCount: 3, intensity: .62 },
    homepage: { pathCount: 6, sparkCount: 5, intensity: 1 },
    'video-studio': { pathCount: 5, sparkCount: 3, intensity: .42 },
  },
  mobile: { pathCount: 4, sparkCount: 2 },
} as const
