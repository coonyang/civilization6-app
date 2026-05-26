export type Civilization = {
  id: string;
  name: string;
  leader: string;
  recommendedVictory: string;
  summary: string;
  ability: string;
  recommendedDistricts: string[];
  tips: string[];
};

export const civilizations: Civilization[] = [
  {
    id: "korea",
    name: "한국",
    leader: "선덕",
    recommendedVictory: "과학 승리",
    summary: "서원을 중심으로 빠르게 과학력을 확보하는 문명",
    ability:
      "서원을 활용해 높은 과학력을 확보하고 총독이 있는 도시를 강화합니다.",
    recommendedDistricts: ["서원", "산업구역", "상업 중심지"],
    tips: [
      "서원 주변에는 다른 특수지구를 무리하게 붙이지 않는 것이 좋습니다.",
      "과학력을 바탕으로 핵심 기술을 먼저 확보하세요.",
      "후반 우주 공항 도시의 생산력을 미리 준비하세요.",
    ],
  },
  {
    id: "rome",
    name: "로마",
    leader: "트라야누스",
    recommendedVictory: "지배 승리 / 문화 승리",
    summary: "빠른 영토 확장과 도로 연결로 안정적인 운영이 가능한 문명",
    ability:
      "새 도시의 초기 기반 시설과 도로 연결을 활용해 확장을 편하게 진행합니다.",
    recommendedDistricts: ["상업 중심지", "병영", "극장가"],
    tips: [
      "초반에 도시를 적극적으로 늘려 영토를 확보하세요.",
      "도로를 통한 빠른 병력 이동을 전쟁에 활용하세요.",
      "확보한 도시 수를 바탕으로 원하는 승리 방향을 정하세요.",
    ],
  },
  {
    id: "japan",
    name: "일본",
    leader: "호조 도키무네",
    recommendedVictory: "문화 승리 / 종교 승리",
    summary: "특수지구를 밀집 배치하여 높은 인접 보너스를 얻는 문명",
    ability: "특수지구를 서로 인접하게 배치하여 효율적인 도시를 만듭니다.",
    recommendedDistricts: ["성지", "극장가", "산업구역"],
    tips: [
      "도시를 지을 때 특수지구가 모일 중심 위치를 먼저 생각하세요.",
      "여러 도시의 특수지구가 함께 붙도록 설계하면 좋습니다.",
      "좁은 지역에서도 높은 효율을 낼 수 있습니다.",
    ],
  },
];
