export type TileContent =
  | "empty"
  | "campus"
  | "holy-site"
  | "commercial-hub"
  | "industrial-zone"
  | "theater-square";

export type HexTile = {
  id: string;
  q: number;
  r: number;
  content: TileContent;
};

export function createEmptyBoard(radius: number): HexTile[] {
  const tiles: HexTile[] = [];

  for (let q = -radius; q <= radius; q++) {
    const minR = Math.max(-radius, -q - radius);
    const maxR = Math.min(radius, -q + radius);

    for (let r = minR; r <= maxR; r++) {
      tiles.push({
        id: `${q},${r}`,
        q,
        r,
        content: "empty",
      });
    }
  }

  return tiles;
}
