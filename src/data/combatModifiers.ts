export type CombatModifier = {
  id: string;
  category: "지형" | "공격 상황" | "방어 상황" | "지원";
  name: string;
  modifier: number;
  description: string;
};

export type DifficultyBonus = {
  difficulty: string;
  playerCombatBonus: number;
  aiCombatBonus: number;
};

export const combatModifiers: CombatModifier[] = [
  {
    id: "hills-defense",
    category: "지형",
    name: "언덕 방어",
    modifier: 3,
    description: "언덕 타일에 있는 방어 유닛은 전투력 보너스를 받습니다.",
  },
  {
    id: "woods-defense",
    category: "지형",
    name: "숲 방어",
    modifier: 3,
    description: "숲 타일에 있는 방어 유닛은 전투력 보너스를 받습니다.",
  },
  {
    id: "rainforest-defense",
    category: "지형",
    name: "열대우림 방어",
    modifier: 3,
    description: "열대우림 타일에 있는 방어 유닛은 전투력 보너스를 받습니다.",
  },
  {
    id: "marsh-defense",
    category: "지형",
    name: "습지 방어",
    modifier: -2,
    description: "습지 타일에 있는 방어 유닛은 전투력 페널티를 받습니다.",
  },
  {
    id: "floodplains-defense",
    category: "지형",
    name: "범람원 방어",
    modifier: -2,
    description: "범람원 타일에 있는 방어 유닛은 전투력 페널티를 받습니다.",
  },
  {
    id: "river-defense",
    category: "방어 상황",
    name: "강 건너편에서 근접 공격을 받음",
    modifier: 5,
    description:
      "공격자와 방어자 사이에 강이 있으면 방어 유닛이 보너스를 받습니다.",
  },
  {
    id: "amphibious-attack",
    category: "공격 상황",
    name: "상륙 공격",
    modifier: -10,
    description:
      "승선한 유닛이 육지의 유닛 또는 특수지구를 공격하면 페널티를 받습니다.",
  },
  {
    id: "hp",
    category: "공격 상황",
    name: "현재 체력에 따른 전투력 보정",
    modifier: 0,
    description:
      "데미지 계산 공식 : - 0.1 x (100 - 체력이 떨어진 수치) | 체력이 50 떨어졌다면 전투력이 -5 감소합니다.",
  },
  {
    id: "attack",
    category: "공격 상황",
    name: "상대 전투력에 따른 전투력 보정",
    modifier: 0,
    description:
      "데미지 계산 공식 : 30 x e^(0.04 x StrengthDifference) x RandomValue | (RandomValue(0.8~1.2사이값)가 같을때 서로의 전투력이 같다면 30의 피해를 받고 차이가 클 수록 더 높은 피해를 받습니다.",
  },
  {
    id: "fortify-one-turn",
    category: "방어 상황",
    name: "요새화 1턴",
    modifier: 3,
    description:
      "한 턴 동안 이동하거나 행동하지 않은 육상 유닛이 받는 방어 보너스입니다.",
  },
  {
    id: "fortify-two-turns",
    category: "방어 상황",
    name: "요새화 2턴 이상",
    modifier: 6,
    description:
      "두 턴 이상 이동하거나 행동하지 않은 육상 유닛이 받는 방어 보너스입니다.",
  },
  {
    id: "flanking",
    category: "지원",
    name: "측면 협공",
    modifier: 2,
    description:
      "군사 전통 해금 후, 근접 공격 시 대상에 인접한 추가 아군 유닛 하나당 받는 보너스입니다.",
  },
  {
    id: "support",
    category: "지원",
    name: "지원 방어",
    modifier: 2,
    description:
      "군사 전통 해금 후, 근접 공격을 방어할 때 인접한 아군 유닛 하나당 받는 보너스입니다.",
  },
];

export const difficultyBonuses: DifficultyBonus[] = [
  {
    difficulty: "개척자",
    playerCombatBonus: 3,
    aiCombatBonus: -1,
  },
  {
    difficulty: "족장",
    playerCombatBonus: 2,
    aiCombatBonus: -1,
  },
  {
    difficulty: "장군",
    playerCombatBonus: 1,
    aiCombatBonus: -1,
  },
  {
    difficulty: "왕자",
    playerCombatBonus: 0,
    aiCombatBonus: 0,
  },
  {
    difficulty: "왕",
    playerCombatBonus: 0,
    aiCombatBonus: 1,
  },
  {
    difficulty: "황제",
    playerCombatBonus: 0,
    aiCombatBonus: 2,
  },
  {
    difficulty: "불멸자",
    playerCombatBonus: 0,
    aiCombatBonus: 3,
  },
  {
    difficulty: "신",
    playerCombatBonus: 0,
    aiCombatBonus: 4,
  },
];
