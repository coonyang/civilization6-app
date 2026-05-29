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
  | "marsh"
  | "forest"
  | "rainforest"
  | "reef";

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

export type ImprovementType = "mine" | "quarry" | "farm" | "lumber-mill";

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
  improvement: ImprovementType | null;
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
        improvement: null,
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

type AdjacencyRule = {
  districts?: {
    types: DistrictType[];
    yield: number;
    amount: number;
  }[];

  terrains?: {
    types: TerrainType[];
    yield: number;
  }[];

  features?: {
    types: FeatureType[];
    yield: number;
    amount?: number;
  }[];

  improvements?: {
    types: ImprovementType[];
    yield: number;
    amount: number;
  }[];

  adjacentDistricts?: {
    district: DistrictType;
    yield: number;
  }[];

  river?: number;
  wonders?: number;
  governmentPlaza?: number;
};

const adjacencyRules: Partial<Record<DistrictType, AdjacencyRule>> = {
  campus: {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    terrains: [
      {
        types: ["mountain"],
        yield: 1,
      },
    ],

    features: [
      {
        types: ["geothermal-fissure"],
        yield: 2,
      },
      {
        types: ["reef"],
        yield: 2,
      },
      {
        types: ["rainforest"],
        amount: 2,
        yield: 1,
      },
    ],

    governmentPlaza: 1,
  },

  "commercial-hub": {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    adjacentDistricts: [
      {
        district: "harbor",
        yield: 2,
      },
    ],

    river: 2,

    governmentPlaza: 1,
  },

  "theater-square": {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    adjacentDistricts: [
      {
        district: "entertainment-complex",
        yield: 2,
      },
      {
        district: "water-park",
        yield: 2,
      },
    ],

    wonders: 2,

    governmentPlaza: 1,
  },

  "holy-site": {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    terrains: [
      {
        types: ["mountain"],
        yield: 1,
      },
    ],

    features: [
      {
        types: ["forest"],
        amount: 2,
        yield: 1,
      },
    ],

    governmentPlaza: 1,
  },
  "industrial-zone": {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    improvements: [
      {
        types: ["mine"],
        amount: 2,
        yield: 1,
      },
      {
        types: ["quarry"],
        amount: 2,
        yield: 1,
      },
    ],

    adjacentDistricts: [
      {
        district: "aqueduct",
        yield: 2,
      },
      {
        district: "dam",
        yield: 2,
      },
      {
        district: "canal",
        yield: 2,
      },
    ],

    governmentPlaza: 1,
  },
  harbor: {
    districts: [
      {
        types: adjacencyDistricts,
        amount: 2,
        yield: 1,
      },
    ],

    adjacentDistricts: [
      {
        district: "city-center",
        yield: 2,
      },
    ],

    governmentPlaza: 1,
  },
};

export function calculateDistrictAdjacency(
  tile: HexTile,
  tiles: HexTile[],
): number {
  if (!tile.district) {
    return 0;
  }

  const rule = adjacencyRules[tile.district];

  if (!rule) {
    return 0;
  }

  const neighbors = getNeighborTiles(tile, tiles);

  let total = 0;

  if (rule.governmentPlaza) {
    const hasGovernmentPlaza = neighbors.some(
      (neighbor) => neighbor.district === "government-plaza",
    );

    if (hasGovernmentPlaza) {
      total += rule.governmentPlaza;
    }
  }

  if (rule.districts) {
    for (const districtRule of rule.districts) {
      const count = neighbors.filter(
        (neighbor) =>
          neighbor.district && districtRule.types.includes(neighbor.district),
      ).length;

      total += Math.floor(count / districtRule.amount) * districtRule.yield;
    }
  }

  if (rule.terrains) {
    for (const terrainRule of rule.terrains) {
      const count = neighbors.filter((neighbor) =>
        terrainRule.types.includes(neighbor.terrain),
      ).length;

      total += count * terrainRule.yield;
    }
  }

  if (rule.features) {
    for (const featureRule of rule.features) {
      const count = neighbors.filter(
        (neighbor) =>
          neighbor.feature && featureRule.types.includes(neighbor.feature),
      ).length;

      if (featureRule.amount) {
        total += Math.floor(count / featureRule.amount) * featureRule.yield;
      } else {
        total += count * featureRule.yield;
      }
    }
  }

  if (rule.improvements) {
    for (const improvementRule of rule.improvements) {
      const count = neighbors.filter(
        (neighbor) =>
          neighbor.improvement &&
          improvementRule.types.includes(neighbor.improvement),
      ).length;

      total +=
        Math.floor(count / improvementRule.amount) * improvementRule.yield;
    }
  }

  if (rule.adjacentDistricts) {
    for (const districtRule of rule.adjacentDistricts) {
      const count = neighbors.filter(
        (neighbor) => neighbor.district === districtRule.district,
      ).length;

      total += count * districtRule.yield;
    }
  }

  if (rule.river) {
    if (tile.riverEdges.length > 0) {
      total += rule.river;
    }
  }

  if (rule.wonders) {
    const wonderCount = neighbors.filter(
      (neighbor) => neighbor.district === "wonder",
    ).length;

    total += wonderCount * rule.wonders;
  }
  return total;
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
};

export const terrainOptions: TerrainOption[] = [
  { id: "plains", name: "평원" },
  { id: "grassland", name: "초원" },
  { id: "desert", name: "사막" },
  { id: "mountain", name: "산" },
  { id: "coast", name: "해안" },
];

export type FeatureOption = {
  id: FeatureType | null;
  name: string;
};

export const featureOptions: FeatureOption[] = [
  { id: null, name: "요소 지우기" },
  { id: "geothermal-fissure", name: "지열 열하구" },
  { id: "oasis", name: "오아시스" },
  { id: "floodplains", name: "범람원" },
  { id: "marsh", name: "습지" },
  { id: "forest", name: "숲" },
  { id: "rainforest", name: "열대우림" },
  { id: "reef", name: "산호초" },
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
};

export const resourceOptions: ResourceOption[] = [
  {
    id: null,
    name: "자원 지우기",
  },
  {
    id: {
      id: "strategic-resource",
      name: "전략자원",
      category: "strategic",
    },
    name: "전략자원",
  },
  {
    id: {
      id: "luxury-resource",
      name: "사치자원",
      category: "luxury",
    },
    name: "사치자원",
  },
  {
    id: {
      id: "bonus-resource",
      name: "보너스자원",
      category: "bonus",
    },
    name: "보너스자원",
  },
  {
    id: {
      id: "artifact-resource",
      name: "유물자원",
      category: "artifact",
    },
    name: "유물자원",
  },
  {
    id: {
      id: "special-resource",
      name: "특수자원",
      category: "special",
    },
    name: "특수자원",
  },
];

export type ImprovementOption = {
  id: ImprovementType | null;
  name: string;
};

export const improvementOptions: ImprovementOption[] = [
  {
    id: null,
    name: "개선시설 지우기",
  },
  {
    id: "mine",
    name: "광산",
  },
  {
    id: "quarry",
    name: "채석장",
  },
  {
    id: "farm",
    name: "농장",
  },
  {
    id: "lumber-mill",
    name: "제재소",
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
