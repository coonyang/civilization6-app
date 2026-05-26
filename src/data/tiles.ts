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

export type PlacementOption = {
  id: TileContent;
  name: string;
  color: string;
};

export const placementOptions: PlacementOption[] = [
  {
    id: "empty",
    name: "지우기",
    color: "#fffdf8",
  },
  {
    id: "campus",
    name: "캠퍼스",
    color: "#6ea9d7",
  },
  {
    id: "holy-site",
    name: "성지",
    color: "#e4c878",
  },
  {
    id: "commercial-hub",
    name: "상업 중심지",
    color: "#d7a759",
  },
  {
    id: "industrial-zone",
    name: "산업구역",
    color: "#8b9298",
  },
  {
    id: "theater-square",
    name: "극장가",
    color: "#ba86bd",
  },
];
