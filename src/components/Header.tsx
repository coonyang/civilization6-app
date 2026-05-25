import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">VI</span>
          <span>
            <strong>CIV GUIDE</strong>
            <small>STRATEGY ARCHIVE</small>
          </span>
        </Link>

        <nav className="main-nav">
          <Link to="/placement">배치툴</Link>
          <Link to="/civilizations">문명 공략</Link>
          <Link to="/war">전쟁 공략</Link>
          <Link to="/community">유저 공략</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
