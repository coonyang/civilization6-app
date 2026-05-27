export type TileContent =
  | "empty"
  | "city-center"
  | "campus"
  | "holy-site"
  | "commercial-hub"
  | "industrial-zone"
  | "theater-square"
  | "government-plaza"
  | "encampment"
  | "harbor"
  | "aerodrome"
  | "entertainment-complex"
  | "water-park"
  | "diplomatic-quarter"
  | "aqueduct"
  | "dam"
  | "canal"
  | "spaceport"
  | "preserve"
  | "neighborhood"
  | "wonder";

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

const neighborDirections = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export function getNeighborTiles(tile: HexTile, tiles: HexTile[]): HexTile[] {
  return neighborDirections
    .map((direction) =>
      tiles.find(
        (candidate) =>
          candidate.q === tile.q + direction.q &&
          candidate.r === tile.r + direction.r,
      ),
    )
    .filter((neighbor): neighbor is HexTile => neighbor !== undefined);
}

const districtContents: TileContent[] = [
  "city-center",
  "campus",
  "holy-site",
  "commercial-hub",
  "industrial-zone",
  "theater-square",
  "government-plaza",
  "encampment",
  "harbor",
  "aerodrome",
  "entertainment-complex",
  "water-park",
  "diplomatic-quarter",
  "aqueduct",
  "dam",
  "canal",
  "spaceport",
  "preserve",
  "neighborhood",
];

export function calculateCampusAdjacency(
  tile: HexTile,
  tiles: HexTile[],
): number {
  if (tile.content !== "campus") {
    return 0;
  }

  const neighbors = getNeighborTiles(tile, tiles);

  const governmentPlazaBonus = neighbors.some(
    (neighbor) => neighbor.content === "government-plaza",
  )
    ? 1
    : 0;

  const adjacentDistrictCount = neighbors.filter((neighbor) =>
    districtContents.includes(neighbor.content),
  ).length;

  const districtBonus = Math.floor(adjacentDistrictCount / 2);

  return governmentPlazaBonus + districtBonus;
}

export type PlacementOption = {
  id: TileContent;
  name: string;
  color: string;
};

export const placementOptions: PlacementOption[] = [
  { id: "empty", name: "지우기", color: "#fffdf8" },
  { id: "city-center", name: "도심부", color: "#b77c54" },
  { id: "campus", name: "캠퍼스", color: "#6ea9d7" },
  { id: "holy-site", name: "성지", color: "#e4c878" },
  { id: "commercial-hub", name: "상업 중심지", color: "#d7a759" },
  { id: "industrial-zone", name: "산업구역", color: "#8b9298" },
  { id: "theater-square", name: "극장가", color: "#ba86bd" },
  { id: "government-plaza", name: "정부 청사", color: "#8e6bb4" },
  { id: "encampment", name: "주둔지", color: "#8e6653" },
  { id: "harbor", name: "항만", color: "#4f9cb7" },
  { id: "aerodrome", name: "비행장", color: "#8395a5" },
  { id: "entertainment-complex", name: "유흥단지", color: "#d87589" },
  { id: "water-park", name: "워터파크", color: "#4caec4" },
  { id: "diplomatic-quarter", name: "외교지구", color: "#86a263" },
  { id: "aqueduct", name: "송수로", color: "#70afc7" },
  { id: "dam", name: "댐", color: "#67859b" },
  { id: "canal", name: "운하", color: "#6ba8bc" },
  { id: "spaceport", name: "우주공항", color: "#53647d" },
  { id: "preserve", name: "보존", color: "#62a57b" },
  { id: "neighborhood", name: "주택단지", color: "#ce9070" },
  { id: "wonder", name: "불가사의", color: "#d9b450" },
];
