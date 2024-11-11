import Nav from './components/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Vote from './components/pages/Vote'
import Statistics from './components/pages/Statistics'
import { useAppSelector } from './redux/store'
import { useEffect } from 'react'

function App() {
  const {user} = useAppSelector((state)=> state.user)
  useEffect(()=>{
    return ()=>{
      localStorage.removeItem("token")
    }
  },[])
  return (
  <div>
    {user? <p>{JSON.stringify(user)}</p>: ""}
    <Nav/>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='votes' element={<Vote/>}/>
      <Route path='statistics' element={<Statistics/>}/>
      <Route path='/' element={<Navigate to={'/login'}/>}/>
    </Routes>
  </div>)
}

export default App