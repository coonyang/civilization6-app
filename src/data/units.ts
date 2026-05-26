export type Unit = {
  id: string;
  name: string;
  era: string;
  strength: number;
  movement: number;
  rangedStrength?: number;
  range?: number;
  resource?: string;
  description: string;
};

export type UnitLine = {
  id: string;
  name: string;
  counterDescription: string;
  units: Unit[];
};

export const unitLines: UnitLine[] = [
  {
    id: "light-cavalry",
    name: "경기병",
    counterDescription:
      "빠른 이동력으로 원거리 유닛과 약한 후방 유닛을 압박하는 병종",
    units: [
      {
        id: "horseman",
        name: "기마병",
        era: "고전",
        strength: 36,
        movement: 4,
        resource: "말",
        description: "기마술 연구시 해금",
      },
      {
        id: "courser",
        name: "군마",
        era: "중세",
        strength: 46,
        movement: 5,
        resource: "말",
        description: "성 연구시 해금",
      },
      {
        id: "cavalry",
        name: "기병대",
        era: "산업",
        strength: 62,
        movement: 5,
        resource: "말",
        description: "군사 과학 연구시 해금",
      },
      {
        id: "helicopter",
        name: "헬리콥터",
        era: "원자",
        strength: 86,
        movement: 4,
        resource: "알루미늄",
        description: "합성 자재 연구시 해금",
      },
    ],
  },
  {
    id: "ranged",
    name: "원거리",
    counterDescription: "안전한 거리에서 공격하지만 근접 공격에 취약한 병종",
    units: [
      {
        id: "slinger",
        name: "투석병",
        era: "고대",
        strength: 5,
        rangedStrength: 15,
        range: 1,
        movement: 2,
        description: "가장 이른 시기에 사용할 수 있는 원거리 유닛",
      },
      {
        id: "archer",
        name: "궁수",
        era: "고대",
        strength: 15,
        rangedStrength: 25,
        range: 2,
        movement: 2,
        description: "초반 방어와 공격에서 유용한 원거리 유닛",
      },
      {
        id: "crossbowman",
        name: "석궁병",
        era: "중세",
        strength: 30,
        rangedStrength: 40,
        range: 2,
        movement: 2,
        description: "궁수에서 업그레이드되는 강력한 중세 원거리 유닛",
      },
    ],
  },
];
