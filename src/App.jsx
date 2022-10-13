import { Home } from './pages/Home'
import  { Login }  from './pages/Login'
import  { Signup }  from './pages/Signup'
import {  Routes, Route } from 'react-router-dom'

import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'

import './assets/css/App.css'

function App() {

  const { user, login: setUser, logout } = useAuth();

  return (

    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App
