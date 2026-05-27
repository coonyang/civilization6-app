export type DistrictType =
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

export type TerrainType =
  | "plains"
  | "grassland"
  | "desert"
  | "mountain"
  | "coast";

export type HexEdge =
  | "east"
  | "north-east"
  | "north-west"
  | "west"
  | "south-west"
  | "south-east";

export type FeatureType =
  | "geothermal-fissure"
  | "oasis"
  | "floodplains"
  | "marsh";

export type ResourceCategory =
  | "strategic"
  | "luxury"
  | "bonus"
  | "artifact"
  | "special";

export type ResourceType = {
  id: string;
  name: string;
  category: ResourceCategory;
};

export type HexTile = {
  id: string;
  q: number;
  r: number;
  terrain: TerrainType;
  isHill: boolean;
  feature: FeatureType | null;
  resource: ResourceType | null;
  district: DistrictType | null;
  riverEdges: HexEdge[];
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
        terrain: "plains",
        isHill: false,
        feature: null,
        resource: null,
        district: null,
        riverEdges: [],
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

const adjacencyDistricts: DistrictType[] = [
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
  if (tile.district !== "campus") {
    return 0;
  }

  const neighbors = getNeighborTiles(tile, tiles);

  const governmentPlazaBonus = neighbors.some(
    (neighbor) => neighbor.district === "government-plaza",
  )
    ? 1
    : 0;

  const adjacentDistrictCount = neighbors.filter(
    (neighbor) =>
      neighbor.district !== null &&
      adjacencyDistricts.includes(neighbor.district),
  ).length;

  const districtBonus = Math.floor(adjacentDistrictCount / 2);

  return governmentPlazaBonus + districtBonus;
}

export type DistrictOption = {
  id: DistrictType | null;
  name: string;
  color: string;
};

export const districtOptions: DistrictOption[] = [
  { id: null, name: "지우기", color: "#fffdf8" },
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

export type TerrainOption = {
  id: TerrainType;
  name: string;
  color: string;
};

export const terrainOptions: TerrainOption[] = [
  { id: "plains", name: "평원", color: "#d3bd7a" },
  { id: "grassland", name: "초원", color: "#92b765" },
  { id: "desert", name: "사막", color: "#ddc888" },
  { id: "mountain", name: "산", color: "#8c8f92" },
  { id: "coast", name: "해안", color: "#68b5cf" },
];

export type FeatureOption = {
  id: FeatureType | null;
  name: string;
  color: string;
};

export const featureOptions: FeatureOption[] = [
  { id: null, name: "요소 지우기", color: "#fffdf8" },
  { id: "geothermal-fissure", name: "지열 열하구", color: "#e16d4d" },
  { id: "oasis", name: "오아시스", color: "#3ca881" },
  { id: "floodplains", name: "범람원", color: "#d4b36d" },
  { id: "marsh", name: "습지", color: "#718e58" },
];

export type HillOption = {
  id: boolean;
  name: string;
};

export const hillOptions: HillOption[] = [
  { id: false, name: "평지" },
  { id: true, name: "언덕" },
];

export type ResourceOption = {
  id: ResourceType | null;
  name: string;
  color: string;
};

export const resourceOptions: ResourceOption[] = [
  {
    id: null,
    name: "자원 지우기",
    color: "#fffdf8",
  },
  {
    id: {
      id: "strategic-resource",
      name: "전략자원",
      category: "strategic",
    },
    name: "전략자원",
    color: "#a55743",
  },
  {
    id: {
      id: "luxury-resource",
      name: "사치자원",
      category: "luxury",
    },
    name: "사치자원",
    color: "#d776a0",
  },
  {
    id: {
      id: "bonus-resource",
      name: "보너스자원",
      category: "bonus",
    },
    name: "보너스자원",
    color: "#79a65d",
  },
  {
    id: {
      id: "artifact-resource",
      name: "유물자원",
      category: "artifact",
    },
    name: "유물자원",
    color: "#b99a65",
  },
  {
    id: {
      id: "special-resource",
      name: "특수자원",
      category: "special",
    },
    name: "특수자원",
    color: "#8870ba",
  },
];

export type RiverEdgeOption = {
  id: HexEdge;
  name: string;
  opposite: HexEdge;
  q: number;
  r: number;
};

export const riverEdgeOptions: RiverEdgeOption[] = [
  {
    id: "east",
    name: "오른쪽 아래",
    opposite: "west",
    q: 1,
    r: 0,
  },
  {
    id: "north-east",
    name: "오른쪽 위",
    opposite: "south-west",
    q: 1,
    r: -1,
  },
  {
    id: "north-west",
    name: "위",
    opposite: "south-east",
    q: 0,
    r: -1,
  },
  {
    id: "west",
    name: "왼쪽 위",
    opposite: "east",
    q: -1,
    r: 0,
  },
  {
    id: "south-west",
    name: "왼쪽 아래",
    opposite: "north-east",
    q: -1,
    r: 1,
  },
  {
    id: "south-east",
    name: "아래",
    opposite: "north-west",
    q: 0,
    r: 1,
  },
];

function updateRiverEdge(
  edges: HexEdge[],
  edge: HexEdge,
  shouldAdd: boolean,
): HexEdge[] {
  if (shouldAdd) {
    return edges.includes(edge) ? edges : [...edges, edge];
  }

  return edges.filter((currentEdge) => currentEdge !== edge);
}

export function toggleRiverEdge(
  selectedTile: HexTile,
  tiles: HexTile[],
  edge: HexEdge,
): HexTile[] {
  const edgeOption = riverEdgeOptions.find((option) => option.id === edge);

  if (!edgeOption) {
    return tiles;
  }

  const shouldAdd = !selectedTile.riverEdges.includes(edge);

  return tiles.map((tile) => {
    if (tile.id === selectedTile.id) {
      return {
        ...tile,
        riverEdges: updateRiverEdge(tile.riverEdges, edge, shouldAdd),
      };
    }

    const isAdjacentTile =
      tile.q === selectedTile.q + edgeOption.q &&
      tile.r === selectedTile.r + edgeOption.r;

    if (isAdjacentTile) {
      return {
        ...tile,
        riverEdges: updateRiverEdge(
          tile.riverEdges,
          edgeOption.opposite,
          shouldAdd,
        ),
      };
    }

    return tile;
  });
}
