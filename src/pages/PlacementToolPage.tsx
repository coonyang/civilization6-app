import { useState } from "react";
import {
  createEmptyBoard,
  placementOptions,
  getNeighborTiles,
  calculateCampusAdjacency,
  type HexTile,
  type TileContent,
} from "../data/tiles";

function getHexPosition(q: number, r: number) {
  const tileWidth = 72;
  const tileHeight = 84;

  const x = q * (tileWidth * 0.75);
  const y = (r + q / 2) * tileHeight;

  return { x, y };
}

function PlacementToolPage() {
  const [tiles, setTiles] = useState<HexTile[]>(() => createEmptyBoard(5));

  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  const neighborTiles = selectedTile
    ? getNeighborTiles(selectedTile, tiles)
    : [];

  const selectedTilePosition = selectedTile
    ? getHexPosition(selectedTile.q, selectedTile.r)
    : null;

  const popupOffsetX = selectedTile && selectedTile.q >= 2 ? -322 : 82;

  const popupOffsetY =
    selectedTile && selectedTile.r + selectedTile.q / 2 >= 2 ? -326 : 0;

  const placeContent = (content: TileContent) => {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, content } : tile,
      ),
    );
    setSelectedTileId(null);
  };

  const clearBoard = () => {
    setTiles(createEmptyBoard(5));
    setSelectedTileId(null);
  };

  return (
    <section className="placement-page">
      <h1>배치툴</h1>
      <p>특수지구를 배치하고 인접 보너스를 계산하세요.</p>

      <p>현재 타일 수: {tiles.length}</p>
      <button className="clear-board-button" type="button" onClick={clearBoard}>
        모두 지우기
      </button>
      <div className="board-viewport">
        <div className="hex-board">
          {tiles.map((tile) => {
            const position = getHexPosition(tile.q, tile.r);
            const contentOption = placementOptions.find(
              (option) => option.id === tile.content,
            );
            const isNeighbor = neighborTiles.some(
              (neighbor) => neighbor.id === tile.id,
            );
            const adjacencyBonus = calculateCampusAdjacency(tile, tiles);
            return (
              <button
                className={`hex-tile ${tile.id === selectedTileId ? "selected" : ""} ${
                  isNeighbor ? "neighbor" : ""
                }`}
                onClick={() => setSelectedTileId(tile.id)}
                key={tile.id}
                type="button"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  backgroundColor: contentOption?.color,
                }}
              >
                {tile.content === "empty" ? (
                  tile.id
                ) : (
                  <>
                    <span>{contentOption?.name}</span>
                    {tile.content === "campus" && (
                      <strong>+{adjacencyBonus}</strong>
                    )}
                  </>
                )}
              </button>
            );
          })}
          {selectedTile && selectedTilePosition && (
            <aside
              className="tile-construction-popup"
              style={{
                transform: `translate(${selectedTilePosition.x + popupOffsetX}px, ${selectedTilePosition.y + popupOffsetY}px)`,
              }}
            >
              <div className="popup-heading">
                <strong>건설 선택</strong>
                <button type="button" onClick={() => setSelectedTileId(null)}>
                  ×
                </button>
              </div>

              <p className="popup-tile-name">{selectedTile.id}</p>

              <div className="popup-options">
                {placementOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => placeContent(option.id)}
                  >
                    <span
                      className="palette-color"
                      style={{ backgroundColor: option.color }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlacementToolPage;
