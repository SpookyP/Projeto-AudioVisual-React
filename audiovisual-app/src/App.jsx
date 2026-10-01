import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import Detalhes from "./pages/Detalhes/Detalhes";
import Favoritos from "./pages/Favoritos/Favoritos";
import MinhasReservas from "./pages/MinhasReservas";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-slate-900 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-amber-500">
              AudioVisual Rent
            </Link>
            <nav className="flex gap-6">
              <Link
                to="/"
                className="hover:text-amber-400 font-medium transition"
              >
                Catálogo
              </Link>
              <Link
                to="/favoritos"
                className="hover:text-amber-400 font-medium transition"
              >
                Favoritos
              </Link>
              <Link
                to="/minhas-reservas"
                className="hover:text-amber-400 font-medium transition"
              >
                As Minhas Reservas
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/minhas-reservas" element={<MinhasReservas />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
