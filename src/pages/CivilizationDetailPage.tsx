import { useParams } from "react-router-dom";
import { civilizations } from "../data/civilizations";

function CivilizationDetailPage() {
  const { civilizationId } = useParams();

  const civilization = civilizations.find((item) => item.id === civilizationId);

  if (!civilization) {
    return <p className="not-found">존재하지 않는 문명입니다.</p>;
  }

  return (
    <section className="content-page detail-page">
      <div className="detail-hero">
        <p className="eyebrow">CIVILIZATION GUIDE</p>
        <h1>{civilization.name}</h1>
        <p className="leader-name">지도자: {civilization.leader}</p>
        <p className="detail-summary">{civilization.summary}</p>
        <div className="victory-panel">
          <span>추천 승리</span>
          <strong>{civilization.recommendedVictory}</strong>
        </div>
      </div>

      <div className="detail-grid">
        <article className="guide-panel ability-panel">
          <h2>문명 특성</h2>
          <p>{civilization.ability}</p>
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
          <h2>운영 팁</h2>
          <ul>
            {civilization.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default CivilizationDetailPage;
