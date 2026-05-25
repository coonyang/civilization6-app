export type Civilization = {
  id: string;
  name: string;
  leader: string;
  recommendedVictory: string;
  summary: string;
};

export const civilizations: Civilization[] = [
  {
    id: "korea",
    name: "한국",
    leader: "선덕",
    recommendedVictory: "과학 승리",
    summary: "서원을 중심으로 빠르게 과학력을 확보하는 문명",
  },
  {
    id: "rome",
    name: "로마",
    leader: "트라야누스",
    recommendedVictory: "지배 승리 / 문화 승리",
    summary: "빠른 영토 확장과 도로 연결로 안정적인 운영이 가능한 문명",
  },
  {
    id: "japan",
    name: "일본",
    leader: "호조 도키무네",
    recommendedVictory: "문화 승리 / 종교 승리",
    summary: "특수지구를 밀집 배치하여 높은 인접 보너스를 얻는 문명",
  },
];
