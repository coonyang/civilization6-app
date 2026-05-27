import { useState } from "react";
import {
  createEmptyBoard,
  districtOptions,
  featureOptions,
  getNeighborTiles,
  hillOptions,
  resourceOptions,
  riverEdgeOptions,
  terrainOptions,
  toggleRiverEdge,
  calculateCampusAdjacency,
  type DistrictType,
  type FeatureType,
  type HexEdge,
  type HexTile,
  type ResourceType,
  type TerrainType,
} from "../data/tiles";

function getHexPosition(q: number, r: number) {
  const tileWidth = 88;
  const tileHeight = 102;

  const x = q * (tileWidth * 0.75);
  const y = (r + q / 2) * tileHeight;

  return { x, y };
}

const renderedSharedRiverEdges: HexEdge[] = [
  "east",
  "north-east",
  "north-west",
];

function shouldRenderRiverEdge(tile: HexTile, edge: HexEdge, tiles: HexTile[]) {
  if (renderedSharedRiverEdges.includes(edge)) {
    return true;
  }

  const edgeOption = riverEdgeOptions.find((option) => option.id === edge);

  if (!edgeOption) {
    return false;
  }

  return !tiles.some(
    (candidate) =>
      candidate.q === tile.q + edgeOption.q &&
      candidate.r === tile.r + edgeOption.r,
  );
}

function PlacementToolPage() {
  const [tiles, setTiles] = useState<HexTile[]>(() => createEmptyBoard(5));
  const [popupTab, setPopupTab] = useState<
    "district" | "terrain" | "feature" | "hill" | "resource" | "river"
  >("district");
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  const neighborTiles = selectedTile
    ? getNeighborTiles(selectedTile, tiles)
    : [];

  const selectedTilePosition = selectedTile
    ? getHexPosition(selectedTile.q, selectedTile.r)
    : null;

  const popupOffsetX = selectedTile && selectedTile.q >= 2 ? -378 : 98;

  const popupOffsetY =
    selectedTile && selectedTile.r + selectedTile.q / 2 >= 2 ? -326 : 0;

  function placeDistrict(district: DistrictType | null) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, district } : tile,
      ),
    );

    setSelectedTileId(null);
  }

  function placeTerrain(terrain: TerrainType) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, terrain } : tile,
      ),
    );
  }

  function placeFeature(feature: FeatureType | null) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, feature } : tile,
      ),
    );
  }

  function placeHill(isHill: boolean) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, isHill } : tile,
      ),
    );
  }

  function placeResource(resource: ResourceType | null) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === selectedTileId ? { ...tile, resource } : tile,
      ),
    );
  }

  function toggleRiver(edge: HexEdge) {
    if (!selectedTile) {
      return;
    }

    setTiles((currentTiles) =>
      toggleRiverEdge(selectedTile, currentTiles, edge),
    );
  }

  function clearBoard() {
    setTiles(createEmptyBoard(5));
    setSelectedTileId(null);
  }

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
            const campusAdjacency = calculateCampusAdjacency(tile, tiles);
            const districtOption = districtOptions.find(
              (option) => option.id === tile.district,
            );
            const isNeighbor = neighborTiles.some(
              (neighbor) => neighbor.id === tile.id,
            );
            const terrainOption = terrainOptions.find(
              (option) => option.id === tile.terrain,
            );
            const tileProperties = [
              tile.district && tile.terrain !== "plains"
                ? terrainOption?.name
                : null,
              tile.isHill ? "언덕" : null,
              tile.feature === "geothermal-fissure"
                ? "열하"
                : tile.feature === "oasis"
                  ? "오아시스"
                  : tile.feature === "floodplains"
                    ? "범람원"
                    : tile.feature === "marsh"
                      ? "습지"
                      : null,
              tile.resource?.category === "strategic"
                ? "전략"
                : tile.resource?.category === "luxury"
                  ? "사치"
                  : tile.resource?.category === "bonus"
                    ? "보너스"
                    : tile.resource?.category === "artifact"
                      ? "유물"
                      : tile.resource?.category === "special"
                        ? "특수"
                        : null,
            ].filter((label): label is string => Boolean(label));
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
                  backgroundColor:
                    districtOption?.color ?? terrainOption?.color,
                }}
              >
                <span className="tile-label">
                  {tile.district !== null
                    ? districtOption?.name
                    : tile.terrain !== "plains"
                      ? terrainOption?.name
                      : tile.id}
                </span>
                {campusAdjacency > 0 && (
                  <span className="adjacency-bonus">+{campusAdjacency}</span>
                )}
                {tileProperties.length > 0 && (
                  <span className="tile-properties">
                    {tileProperties.join(" ")}
                  </span>
                )}

                {tile.riverEdges
                  .filter((edge) => shouldRenderRiverEdge(tile, edge, tiles))
                  .map((edge) => (
                    <span
                      aria-hidden="true"
                      className={`river-edge river-${edge}`}
                      key={edge}
                    />
                  ))}
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
              <div className="popup-tabs">
                <button
                  className={popupTab === "district" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("district")}
                >
                  건설
                </button>
                <button
                  className={popupTab === "terrain" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("terrain")}
                >
                  지형
                </button>
                <button
                  className={popupTab === "feature" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("feature")}
                >
                  요소
                </button>
                <button
                  className={popupTab === "hill" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("hill")}
                >
                  고도
                </button>

                <button
                  className={popupTab === "resource" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("resource")}
                >
                  자원
                </button>
                <button
                  className={popupTab === "river" ? "selected" : ""}
                  type="button"
                  onClick={() => setPopupTab("river")}
                >
                  강
                </button>
              </div>
              <div className="popup-options">
                {popupTab === "district" &&
                  districtOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => placeDistrict(option.id)}
                    >
                      <span
                        className="palette-color"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.name}
                    </button>
                  ))}

                {popupTab === "terrain" &&
                  terrainOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => placeTerrain(option.id)}
                    >
                      <span
                        className="palette-color"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.name}
                    </button>
                  ))}

                {popupTab === "feature" &&
                  featureOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => placeFeature(option.id)}
                    >
                      <span
                        className="palette-color"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.name}
                    </button>
                  ))}

                {popupTab === "hill" &&
                  hillOptions.map((option) => (
                    <button
                      className={
                        selectedTile.isHill === option.id ? "selected" : ""
                      }
                      key={option.name}
                      type="button"
                      onClick={() => placeHill(option.id)}
                    >
                      {option.name}
                    </button>
                  ))}

                {popupTab === "resource" &&
                  resourceOptions.map((option) => (
                    <button
                      className={
                        selectedTile.resource?.id === option.id?.id
                          ? "selected"
                          : ""
                      }
                      key={option.name}
                      type="button"
                      onClick={() => placeResource(option.id)}
                    >
                      <span
                        className="palette-color"
                        style={{ backgroundColor: option.color }}
                      />
                      {option.name}
                    </button>
                  ))}

                {popupTab === "river" &&
                  riverEdgeOptions.map((option) => (
                    <button
                      className={
                        selectedTile.riverEdges.includes(option.id)
                          ? "selected"
                          : ""
                      }
                      key={option.id}
                      type="button"
                      onClick={() => toggleRiver(option.id)}
                    >
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
