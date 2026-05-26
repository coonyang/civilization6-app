import { useState } from "react";
import { useParams } from "react-router-dom";
import { civilizations } from "../data/civilizations";

function CivilizationDetailPage() {
  const { civilizationId } = useParams();
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);

  const civilization = civilizations.find((item) => item.id === civilizationId);

  if (!civilization) {
    return <p className="not-found">존재하지 않는 문명입니다.</p>;
  }

  const selectedLeader =
    civilization.leaders.find((leader) => leader.id === selectedLeaderId) ??
    civilization.leaders[0];

  return (
    <section className="content-page detail-page">
      <div className="detail-hero">
        <p className="eyebrow">CIVILIZATION GUIDE</p>
        <h1>{civilization.name}</h1>

        <div className="leader-selector">
          {civilization.leaders.map((leader) => (
            <button
              className={leader.id === selectedLeader.id ? "selected" : ""}
              key={leader.id}
              type="button"
              onClick={() => setSelectedLeaderId(leader.id)}
            >
              {leader.name}
            </button>
          ))}
        </div>

        <p className="detail-summary">{civilization.summary}</p>
        <div className="victory-panel">
          <span>추천 승리</span>
          <strong>{selectedLeader.recommendedVictory}</strong>
        </div>
      </div>

      <div className="detail-grid">
        <article className="guide-panel ability-panel">
          <h2>문명 특성: {civilization.civilizationAbilityName}</h2>
          <p>{civilization.civilizationAbilityDescription}</p>
        </article>

        <article className="guide-panel leader-panel">
          <h2>지도자 특성: {selectedLeader.abilityName}</h2>
          <p>{selectedLeader.abilityDescription}</p>
        </article>

        <article className="guide-panel">
          <h2>고유 요소</h2>
          <ul className="district-tags">
            <li>{civilization.uniqueUnit}</li>
            <li>{civilization.uniqueInfrastructure}</li>
          </ul>
        </article>

        <article className="guide-panel">
          <h2>추천 특수지구</h2>
          <ul className="district-tags">
            {civilization.recommendedDistricts.map((district) => (
              <li key={district}>{district}</li>
            ))}
          </ul>
        </article>

        <article className="guide-panel tips-panel">
          <h2>{selectedLeader.name} 운영 팁</h2>
          <ul>
            {selectedLeader.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default CivilizationDetailPage;
