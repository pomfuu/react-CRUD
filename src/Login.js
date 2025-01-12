import React, { useContext, useState } from 'react';
import icon from '../src/Assets/login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from './UserContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const users = querySnapshot.docs.map((doc) => doc.data());

      const user = users.find((user) => user.name === email);

      if (user) {
        setUser(user); 
        if (user.role === "vendor") {
          localStorage.setItem("vendor", user.name); 
          navigate("/product", { state: { vendor: user.name } });
          console.log(user.name)
        } else if (user.role === "admin") {
          navigate("/admin/role-and-banner");
        } else {
          setErrorMessage("Unauthorized role");
        }
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#FBFAF5', fontFamily: 'afacad' }}
    >
      <div className="col-1">
        <img src={icon} alt="Email Icon" style={{ width: '120px', height: '120px' }} />
      </div>
      <div className="col-4">
        <h2 className="text-start mb-4" style={{ color: '#1A47BC' }}>
          KOSU LOGIN
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-1" style={{ color: '#1A47BC' }}>
            Email
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-1" style={{ color: '#1A47BC' }}>
            Password
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
