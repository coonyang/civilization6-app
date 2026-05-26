import { Link } from "react-router-dom";
import { civilizations } from "../data/civilizations";

function CivilizationGuidePage() {
  return (
    <section className="content-page">
      <div className="page-heading">
        <p className="eyebrow">CIVILIZATION GUIDE</p>
        <h1>문명 공략</h1>
        <p>문명을 선택하고 지도자별 특성과 운영 팁을 확인하세요.</p>
      </div>

      <div className="civilization-grid">
        {civilizations.map((civilization) => (
          <Link
            className="civilization-card"
            key={civilization.id}
            to={`/civilizations/${civilization.id}`}
          >
            <div className="civilization-card-title">
              <h2>{civilization.name}</h2>
              <span>
                {civilization.leaders.map((leader) => leader.name).join(" / ")}
              </span>
            </div>
            <p className="victory-tag">
              {civilization.leaders[0].recommendedVictory}
            </p>
            <p className="card-summary">{civilization.summary}</p>
            <span className="card-link">공략 보기</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CivilizationGuidePage;
