import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Recommended from "./pages/Recommended/Recommended";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route
              path="*"
              element={<div className="not-found">404 - Page not found</div>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
