import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CivilizationDetailPage from "./pages/CivilizationDetailPage";
import CivilizationGuidePage from "./pages/CivilizationGuidePage";
import CommunityGuidePage from "./pages/CommunityGuidePage";
import HomePage from "./pages/HomePage";
import PlacementToolPage from "./pages/PlacementToolPage";
import WarGuidePage from "./pages/WarGuidePage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/placement" element={<PlacementToolPage />} />
          <Route path="/civilizations" element={<CivilizationGuidePage />} />
          <Route
            path="/civilizations/:civilizationId"
            element={<CivilizationDetailPage />}
          />
          <Route path="/war" element={<WarGuidePage />} />
          <Route path="/community" element={<CommunityGuidePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
