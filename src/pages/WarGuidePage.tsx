import { useState } from "react";
import { unitLines } from "../data/units";
import { combatModifiers, difficultyBonuses } from "../data/combatModifiers";

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
    return <p className="not-found">병종 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <section className="content-page war-page">
        <div className="page-heading">
          <p className="eyebrow">WARFARE GUIDE</p>
          <h1>전쟁 공략</h1>
          <p>병종별 업그레이드 계보와 전투 정보를 확인하세요.</p>
        </div>

        <div className="unit-line-tabs">
          {unitLines.map((line) => (
            <button
              className={line.id === selectedLineId ? "selected" : ""}
              key={line.id}
              type="button"
              onClick={() => setSelectedLineId(line.id)}
            >
              {line.name}
            </button>
          ))}
        </div>

        <div className="war-grid">
          <article className="lineage-panel">
            <p className="panel-label">UPGRADE PATH</p>
            <h2>{selectedLine.name} 계보</h2>
            <p className="line-description">
              {selectedLine.counterDescription}
            </p>

            <div className="upgrade-path">
              {selectedLine.units.map((unit, index) => (
                <span className="upgrade-step" key={unit.id}>
                  <button
                    className={unit.id === selectedUnit?.id ? "selected" : ""}
                    type="button"
                    onClick={() => setSelectedUnitId(unit.id)}
                  >
                    <small>{unit.era}</small>
                    {unit.name}
                  </button>

                  {index < selectedLine.units.length - 1 && (
                    <span className="path-arrow">{"\u2192"}</span>
                  )}
                </span>
              ))}
            </div>
          </article>

          {selectedUnit && (
            <article className="unit-detail-panel">
              <p className="panel-label">UNIT DETAIL</p>
              <h2>{selectedUnit.name}</h2>
              <p className="unit-description">{selectedUnit.description}</p>

              <dl className="unit-stats">
                <div>
                  <dt>시대</dt>
                  <dd>{selectedUnit.era}</dd>
                </div>
                <div>
                  <dt>전투력</dt>
                  <dd>{selectedUnit.strength}</dd>
                </div>
                <div>
                  <dt>이동력</dt>
                  <dd>{selectedUnit.movement}</dd>
                </div>

                {selectedUnit.resource && (
                  <div>
                    <dt>필요 자원</dt>
                    <dd>{selectedUnit.resource}</dd>
                  </div>
                )}

                {selectedUnit.rangedStrength && (
                  <div>
                    <dt>원거리 전투력</dt>
                    <dd>{selectedUnit.rangedStrength}</dd>
                  </div>
                )}

                {selectedUnit.range && (
                  <div>
                    <dt>사거리</dt>
                    <dd>{selectedUnit.range}</dd>
                  </div>
                )}
              </dl>
            </article>
          )}
        </div>
      </section>
      <section className="rules-panel">
        <div className="rules-heading">
          <p className="panel-label">COMBAT MODIFIERS</p>
          <h2>전투 보정 정보</h2>
        </div>

        <div className="table-scroll">
          <table className="guide-table">
            <thead>
              <tr>
                <th>분류</th>
                <th>상황</th>
                <th>전투력</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              {combatModifiers.map((modifier) => (
                <tr key={modifier.id}>
                  <td>{modifier.category}</td>
                  <td>{modifier.name}</td>
                  <td
                    className={
                      modifier.modifier > 0 ? "positive" : "negative"
                    }
                  >
                    {modifier.modifier > 0
                      ? `+${modifier.modifier}`
                      : modifier.modifier}
                  </td>
                  <td>{modifier.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rules-panel">
        <div className="rules-heading">
          <p className="panel-label">DIFFICULTY BONUS</p>
          <h2>난이도별 전투력 보정</h2>
        </div>

        <div className="table-scroll">
          <table className="guide-table difficulty-table">
            <thead>
              <tr>
                <th>난이도</th>
                <th>플레이어 전투력</th>
                <th>AI 전투력</th>
              </tr>
            </thead>
            <tbody>
              {difficultyBonuses.map((bonus) => (
                <tr key={bonus.difficulty}>
                  <td>{bonus.difficulty}</td>
                  <td className={bonus.playerCombatBonus > 0 ? "positive" : ""}>
                    {bonus.playerCombatBonus > 0
                      ? `+${bonus.playerCombatBonus}`
                      : bonus.playerCombatBonus}
                  </td>
                  <td
                    className={
                      bonus.aiCombatBonus > 0
                        ? "negative"
                        : bonus.aiCombatBonus < 0
                          ? "positive"
                          : ""
                    }
                  >
                    {bonus.aiCombatBonus > 0
                      ? `+${bonus.aiCombatBonus}`
                      : bonus.aiCombatBonus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default WarGuidePage;
