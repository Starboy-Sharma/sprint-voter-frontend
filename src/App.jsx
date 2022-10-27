import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Teams } from './pages/Teams';
import { Signup } from './pages/Signup';
import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import './assets/css/App.css';
import { RequireAuth } from './pages/RequireAuth';

import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<RequireAuth />}>
            <Route path="/teams" element={<Teams />} />
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
