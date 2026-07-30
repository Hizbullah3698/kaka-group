/**
 * Quadratic-bezier arc between two projected [x, y] points, control point
 * lifted perpendicular to the midpoint by the horizontal distance times
 * `lift`. This is the exact curve construction used in both `trade-map.html`
 * and `export-routes.html` — shared here since the two maps only differ in
 * their node data and arc styling, not in how a "great-circle-ish" arc
 * between hub and node is drawn.
 */
export function arcPath(from: [number, number], to: [number, number], lift: number): string {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2 - Math.abs(from[0] - to[0]) * lift;
  return `M${from[0]},${from[1]} Q${mx},${my} ${to[0]},${to[1]}`;
}
