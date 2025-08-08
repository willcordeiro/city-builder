export function getAdjustedPosition(
  base: [number, number, number],
  offset?: [number, number, number]
): [number, number, number] {
  const finalOffset = offset ?? [0, 0, 0];
  return [
    base[0] + finalOffset[0],
    base[1] + finalOffset[1],
    base[2] + finalOffset[2],
  ];
}
