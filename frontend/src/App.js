import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import UserList from './userList';
import './App.css';
import Cookie from "js-cookie";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  console.log(">_< ~ App ~ role:", role)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, [token]);


  useEffect(() => {
    const token = Cookie.get(process.env.REACT_APP_COOKIE_NAME);
    if (token) {
      setToken(token);
    }
  }, [setToken]);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            {token && <Link to="/users">User List</Link>}
          </nav>
        </header>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setToken} />} />
          {token && <Route path="/users" element={<UserList token={token} role={role} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;