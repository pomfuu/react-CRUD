import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Write from './componentsVendor/Write';
import SideBar from './componentsVendor/Sidebar';
import Read from './componentsVendor/Read';
import ProductDetail from './componentsVendor/ProductDetail';
import EditProduct from './componentsVendor/EditProduct';
import Order from './componentsVendor/Order';
import Login from './Login';
import UserList from './componentsAdmin/UserList';

function App() {
  const location = useLocation();
  const noSidebar = ['/login'];
  const role = location.pathname.startsWith('/admin') ? 'admin' : 'vendor';

  return (
      <div className="App">
          {!noSidebar.includes(location.pathname) && (
              <SideBar activePath={location.pathname} role={role} />
          )}
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/product/create" element={<Write />} />
              <Route path="/product" element={<Read />} />
              <Route path="/product/:productID" element={<ProductDetail />} />
              <Route path="/product/edit/:productID" element={<EditProduct />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/role-and-banner" element={<UserList />} />
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
