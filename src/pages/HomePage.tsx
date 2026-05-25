import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">SID MEIER'S CIVILIZATION VI</p>
          <h1>
            한 타일의 선택이
            <span>문명의 역사를 바꿉니다</span>
          </h1>
          <p className="hero-description">
            특수지구 배치를 설계하고, 문명별 운영법과 전쟁 정보를 확인하세요.
            완성한 전략은 다른 플레이어와 공유할 수 있습니다.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/placement">
              배치 시작하기
            </Link>
            <Link className="secondary-button" to="/civilizations">
              문명 공략 보기
            </Link>
          </div>
        </div>
        <div className="hex-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">STRATEGY TOOLS</p>
          <h2>무엇을 준비하시겠습니까?</h2>
        </div>

        <div className="feature-grid">
          <Link className="feature-card" to="/placement">
            <span className="card-number">01</span>
            <h3>배치툴</h3>
            <p>육각 타일 위에 구역을 배치하고 인접 보너스를 계산합니다.</p>
          </Link>
          <Link className="feature-card" to="/civilizations">
            <span className="card-number">02</span>
            <h3>문명 공략</h3>
            <p>지도자별 강점과 추천 승리 조건, 핵심 운영을 살펴봅니다.</p>
          </Link>
          <Link className="feature-card" to="/war">
            <span className="card-number">03</span>
            <h3>전쟁 공략</h3>
            <p>유닛 상성, 지형 보너스와 업그레이드 경로를 확인합니다.</p>
          </Link>
          <Link className="feature-card" to="/community">
            <span className="card-number">04</span>
            <h3>유저 공략</h3>
            <p>배치 전략을 작성하고 문명별 노하우를 함께 공유합니다.</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
