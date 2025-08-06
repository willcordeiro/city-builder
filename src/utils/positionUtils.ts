export function getAdjustedPosition(
  base: [number, number, number],
  offset: [number, number, number]
): [number, number, number] {
  return [base[0] + offset[0], base[1] + offset[1], base[2] + offset[2]];
}
