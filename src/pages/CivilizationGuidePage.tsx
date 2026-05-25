import { Link } from "react-router-dom";
import { civilizations } from "../data/civilizations";

function CivilizationGuidePage() {
  return (
    <section>
      <h1>문명 공략</h1>
      <p>문명을 선택하고 추천 승리 조건과 운영 팁을 확인하세요.</p>

      <div>
        {civilizations.map((civilization) => (
          <Link key={civilization.id} to={`/civilizations/${civilization.id}`}>
            <h2>{civilization.name}</h2>
            <p>지도자: {civilization.leader}</p>
            <p>추천 승리: {civilization.recommendedVictory}</p>
            <p>{civilization.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CivilizationGuidePage;
