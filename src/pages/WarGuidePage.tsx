import { useState } from "react";
import { unitLines } from "../data/units";

function WarGuidePage() {
  const [selectedLineId, setSelectedLineId] = useState(unitLines[0].id);
  const [selectedUnitId, setSelectedUnitId] = useState(
    unitLines[0].units[0].id,
  );
  const selectedLine = unitLines.find((line) => line.id === selectedLineId);
  const selectedUnit =
    selectedLine?.units.find((unit) => unit.id === selectedUnitId) ??
    selectedLine?.units[0];
  if (!selectedLine) {
    return <p>병종 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <section>
      <h1>전쟁 공략</h1>
      <p>병종별 업그레이드 계보와 전투 정보를 확인하세요.</p>

      <h2>병종 선택</h2>
      <div>
        {unitLines.map((line) => (
          <button
            key={line.id}
            type="button"
            onClick={() => setSelectedLineId(line.id)}
          >
            {line.name}
          </button>
        ))}
      </div>

      <h2>{selectedLine.name} 계보</h2>
      <p>{selectedLine.counterDescription}</p>

      <div>
        {selectedLine.units.map((unit, index) => (
          <span key={unit.id}>
            <button type="button" onClick={() => setSelectedUnitId(unit.id)}>
              {unit.name}
            </button>

            {index < selectedLine.units.length - 1 && <span> → </span>}
          </span>
        ))}
      </div>

      {selectedUnit && (
        <article>
          <h2>{selectedUnit.name}</h2>
          <p>시대: {selectedUnit.era}</p>
          <p>전투력: {selectedUnit.strength}</p>
          <p>이동력: {selectedUnit.movement}</p>

          {selectedUnit.resource && <p>필요 자원: {selectedUnit.resource}</p>}

          {selectedUnit.rangedStrength && (
            <p>원거리 전투력: {selectedUnit.rangedStrength}</p>
          )}

          {selectedUnit.range && <p>사거리: {selectedUnit.range}</p>}

          <p>{selectedUnit.description}</p>
        </article>
      )}
    </section>
  );
}

export default WarGuidePage;
