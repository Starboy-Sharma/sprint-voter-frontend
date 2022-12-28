import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Teams } from './pages/Teams';
import { Signup } from './pages/Signup';
import { Chats } from './pages/Chats';
import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import './assets/css/App.css';
import { RequireAuth } from './pages/RequireAuth';

import { useState, useEffect } from 'react';

function sessionExists() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    return user;
  }

  return null;
}

function App() {
  const [user, setUser] = useState(sessionExists());

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<RequireAuth />}>
            <Route path="/teams" element={<Teams />} />
            <Route path="/planning" element={<Chats />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
