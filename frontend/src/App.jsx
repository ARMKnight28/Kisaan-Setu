import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* We will add /login, /farmer/dashboard, and /admin/dashboard routes next */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;