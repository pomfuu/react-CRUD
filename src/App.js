import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Write from './components/Write';
import SideBar from './components/Sidebar';
import Read from './components/Read';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <SideBar activePath={location.pathname} />
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/product/create" element={<Write />} />
        <Route path="/product" element={<Read />} />
      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
