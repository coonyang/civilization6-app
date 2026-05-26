import { useParams } from "react-router-dom";
import { civilizations } from "../data/civilizations";

function CivilizationDetailPage() {
  const { civilizationId } = useParams();

  const civilization = civilizations.find((item) => item.id === civilizationId);

  if (!civilization) {
    return <p>존재하지 않는 문명입니다.</p>;
  }

  return (
    <section>
      <h1>{civilization.name}</h1>
      <p>지도자: {civilization.leader}</p>
      <p>추천 승리: {civilization.recommendedVictory}</p>
      <p>{civilization.summary}</p>

      <h2>문명 특성</h2>
      <p>{civilization.ability}</p>

      <h2>추천 특수지구</h2>
      <ul>
        {civilization.recommendedDistricts.map((district) => (
          <li key={district}>{district}</li>
        ))}
      </ul>

      <h2>운영 팁</h2>
      <ul>
        {civilization.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}

export default CivilizationDetailPage;
