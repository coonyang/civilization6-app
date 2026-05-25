import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">CIV VI GUIDE</Link>

      <nav>
        <Link to="/placement">배치툴</Link>
        <Link to="/civilizations">문명 공략</Link>
        <Link to="/war">전쟁 공략</Link>
        <Link to="/community">유저 공략</Link>
      </nav>
    </header>
  );
}

export default Header;
