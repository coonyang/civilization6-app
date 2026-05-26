import { useState } from "react";
import { createEmptyBoard, type HexTile } from "../data/tiles";

function getHexPosition(q: number, r: number) {
  const tileWidth = 72;
  const tileHeight = 84;

  const x = q * (tileWidth * 0.75);
  const y = (r + q / 2) * tileHeight;

  return { x, y };
}

function PlacementToolPage() {
  const [tiles] = useState<HexTile[]>(() => createEmptyBoard(5));

  return (
    <section className="placement-page">
      <h1>배치툴</h1>
      <p>특수지구를 배치하고 인접 보너스를 계산하세요.</p>

      <p>현재 타일 수: {tiles.length}</p>

      <div className="board-viewport">
        <div className="hex-board">
          {tiles.map((tile) => {
            const position = getHexPosition(tile.q, tile.r);

            return (
              <button
                className="hex-tile"
                key={tile.id}
                type="button"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                }}
              >
                {tile.id}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PlacementToolPage;
