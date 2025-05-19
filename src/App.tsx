import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Games from './pages/Games';
import Contact from './pages/Contact';
import Snake from './games/Snake';
import Tetris from './games/Tetris';
import Minesweeper from './games/Minesweeper';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/snake" element={<Snake />} />
            <Route path="/games/tetris" element={<Tetris />} />
            <Route path="/games/minesweeper" element={<Minesweeper />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-2xl text-commie-red">Страница не найдена</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
