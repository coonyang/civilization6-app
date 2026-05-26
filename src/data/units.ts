export type MilitaryUnit = {
  id: string;
  name: string;
  unitClass: string;
  era: string;
  strength: number;
  movement: number;
  upgradesTo: string | null;
  advantages: string[];
  terrainBonuses: string[];
};

export const militaryUnits: MilitaryUnit[] = [
  {
    id: "warrior",
    name: "전사",
    unitClass: "근접",
    era: "고대",
    strength: 20,
    movement: 2,
    upgradesTo: "검사",
    advantages: ["대기병 유닛을 상대하기 좋음", "도시 점령 가능"],
    terrainBonuses: ["언덕 및 숲에서 방어 시 유리"],
  },
  {
    id: "slinger",
    name: "투석병",
    unitClass: "원거리",
    era: "고대",
    strength: 5,
    movement: 2,
    upgradesTo: "궁수",
    advantages: ["근접 공격을 받기 전에 원거리 공격 가능"],
    terrainBonuses: ["언덕 위에서 시야 확보에 유리"],
  },
  {
    id: "spearman",
    name: "창병",
    unitClass: "대기병",
    era: "고대",
    strength: 25,
    movement: 2,
    upgradesTo: "장창병",
    advantages: ["기병 계열 유닛을 상대로 강함"],
    terrainBonuses: ["강 건너 공격을 받는 상황에서 방어에 유리"],
  },
  {
    id: "horseman",
    name: "기마병",
    unitClass: "경기병",
    era: "고전",
    strength: 36,
    movement: 4,
    upgradesTo: "군마",
    advantages: ["원거리 유닛을 빠르게 추격", "약탈과 측면 공격에 유리"],
    terrainBonuses: ["평지에서 빠른 이동을 활용하기 좋음"],
  },
];
