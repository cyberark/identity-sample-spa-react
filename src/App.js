import Intro from './pages/Intro';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import LoginProtocols from './pages/LoginProtocols';
import Widget from './pages/Widget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/loginprotocols" element={<LoginProtocols />} />
        <Route path="/widget" element={<Widget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
