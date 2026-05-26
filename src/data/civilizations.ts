export type Leader = {
  id: string;
  name: string;
  abilityName: string;
  abilityDescription: string;
  recommendedVictory: string;
  tips: string[];
};

export type Civilization = {
  id: string;
  name: string;
  summary: string;
  civilizationAbilityName: string;
  civilizationAbilityDescription: string;
  uniqueUnit: string;
  uniqueInfrastructure: string;
  recommendedDistricts: string[];
  leaders: Leader[];
};

export const civilizations: Civilization[] = [
  {
    id: "korea",
    name: "한국",
    summary:
      "서원을 중심으로 빠르게 과학력을 확보하고 문화 발전까지 연결하는 문명",
    civilizationAbilityName: "삼국 시대",
    civilizationAbilityDescription:
      "서원에 인접한 광산은 과학 +1, 농장은 식량 +1을 얻습니다.",
    uniqueUnit: "화차",
    uniqueInfrastructure: "서원",
    recommendedDistricts: ["서원", "산업구역", "상업 중심지"],
    leaders: [
      {
        id: "seondeok",
        name: "선덕",
        abilityName: "화랑",
        abilityDescription:
          "총독이 배치된 도시는 해당 총독이 획득한 진급 하나당 과학과 문화가 3% 증가합니다.",
        recommendedVictory: "과학 승리",
        tips: [
          "총독을 주요 과학 도시와 우주 공항을 지을 생산 도시에 집중하세요.",
          "서원은 다른 특수지구와 떨어뜨리고, 주변 광산과 농장으로 공통 특성을 활용하세요.",
          "총독 진급을 확보할수록 과학과 문화 보너스가 함께 커집니다.",
        ],
      },
      {
        id: "sejong",
        name: "세종",
        abilityName: "한글",
        abilityDescription:
          "새로운 시대의 첫 기술을 완료하면 턴당 과학의 2배만큼 문화를 획득합니다.",
        recommendedVictory: "과학 승리",
        tips: [
          "새 시대의 첫 기술을 완료하기 직전에 턴당 과학을 최대한 높이세요.",
          "강한 과학 진행으로 문화를 일시적으로 크게 얻어 사회 제도 진행을 보완하세요.",
          "서원과 인접한 광산을 우선 확보해 한글 보너스의 기준이 되는 과학력을 키우세요.",
        ],
      },
    ],
  },
  {
    id: "rome",
    name: "로마",
    summary: "빠른 영토 확장과 도로 연결로 안정적인 운영이 가능한 문명",
    civilizationAbilityName: "모든 길은 로마로 통한다",
    civilizationAbilityDescription:
      "직접 세우거나 점령한 도시는 교역소를 가진 채 시작하며, 수도의 교역 범위 안이라면 수도로 향하는 도로도 생성됩니다.",
    uniqueUnit: "군단병",
    uniqueInfrastructure: "목욕탕",
    recommendedDistricts: ["상업 중심지", "병영", "극장가"],
    leaders: [
      {
        id: "trajan",
        name: "트라야누스",
        abilityName: "트라야누스 원기둥",
        abilityDescription:
          "새로 건설한 모든 도시는 도심부에 무료 건물을 하나 받고 시작합니다.",
        recommendedVictory: "지배 승리 / 문화 승리",
        tips: [
          "초반에 도시를 적극적으로 늘려 무료 기반 시설의 이점을 누리세요.",
          "도로를 통한 빠른 병력 이동을 군단병 타이밍의 전쟁에 활용하세요.",
          "넓어진 제국의 교역망으로 원하는 승리 방향을 뒷받침하세요.",
        ],
      },
    ],
  },
  {
    id: "japan",
    name: "일본",
    summary: "특수지구를 밀집 배치하여 높은 인접 보너스를 얻는 문명",
    civilizationAbilityName: "메이지 유신",
    civilizationAbilityDescription:
      "모든 특수지구는 인접한 다른 특수지구로부터 추가 인접 보너스를 얻습니다.",
    uniqueUnit: "사무라이",
    uniqueInfrastructure: "전자 공장",
    recommendedDistricts: ["성지", "극장가", "산업구역"],
    leaders: [
      {
        id: "hojo-tokimune",
        name: "호조 도키무네",
        abilityName: "신풍",
        abilityDescription:
          "해안에 인접한 육지 타일의 지상 유닛과 연안 해역의 해상 유닛이 전투력 +5를 얻고, 주둔지, 성지, 극장가를 절반의 시간으로 건설합니다.",
        recommendedVictory: "문화 승리 / 종교 승리",
        tips: [
          "도시를 세울 때 여러 특수지구가 모일 중심 위치를 먼저 계획하세요.",
          "성지와 극장가의 빠른 건설을 활용해 문화 또는 종교 승리를 준비하세요.",
          "해안 전투 보너스를 활용할 수 있는 지도에서는 방어와 공격 모두 강해집니다.",
        ],
      },
    ],
  },
];
