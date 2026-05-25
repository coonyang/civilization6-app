import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />

      <main className="site-main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
