import Nav from './components/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Vote from './components/pages/Vote'
import Statistics from './components/pages/Statistics'

function App() {
  return (
  <div>
    <Nav/>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='vote' element={<Vote/>}/>
      <Route path='statistics' element={<Statistics/>}/>
      <Route path='/' element={<Navigate to={'/votes'}/>}/>
    </Routes>
  </div>)
}

export default App
