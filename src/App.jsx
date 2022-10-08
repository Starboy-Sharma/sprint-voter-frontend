import { Home } from './pages/Home/Home'
import  { Login }  from './pages/Login/Login'
import {  Routes, Route } from 'react-router-dom'

import './assets/css/App.css'

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>
  )
}

export default App
