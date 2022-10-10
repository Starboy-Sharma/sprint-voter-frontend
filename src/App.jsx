import { Home } from './pages/Home/Home'
import  { Login }  from './pages/Login/Login'
import {  Routes, Route } from 'react-router-dom'

import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'

import './assets/css/App.css'

function App() {

  const { user, login, logout } = useAuth();

  return (

    <AuthContext.Provider value={{ user, login }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App
