import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Write from './components/Write';
import SideBar from './components/Sidebar';
import Read from './components/Read';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <SideBar activePath={location.pathname} />
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/product/create" element={<Write />} />
        <Route path="/product" element={<Read />} />
        <Route path="/product/:productID" element={<ProductDetail />} />
        <Route path="/product/edit/:productID" element={<EditProduct />} />
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
