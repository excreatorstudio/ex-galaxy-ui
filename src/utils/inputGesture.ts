export interface PointerPoint { x: number; y: number }

export const isActivationTap = (start: PointerPoint | null, end: PointerPoint, threshold: number) => {
  if (!start) return false
  return Math.hypot(end.x - start.x, end.y - start.y) <= threshold
}
