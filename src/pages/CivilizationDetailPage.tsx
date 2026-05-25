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
    </section>
  );
}

export default CivilizationDetailPage;
