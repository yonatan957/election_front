import Nav from './components/Nav'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Vote from './components/pages/Vote'
import Statistics from './components/pages/Statistics'
import { addVote, RootState, useAppSelector } from './redux/store'
import { useEffect } from 'react'
import { socket } from './main'
import { useDispatch } from 'react-redux'
import { IaddVote } from './types/redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {user} = useAppSelector((state)=> state.user)
  const candidates = useAppSelector((state:RootState)=>state.cadidates.candidates)
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      localStorage.removeItem("token")
    }
  },[])

  useEffect(()=>{
    const handlePublishVote = (candidate:IaddVote) => {
      dispatch(addVote(candidate))
      toast(`someone vote for ${candidate.candidate.name}`)
    }
  
    socket.on("publishVote", handlePublishVote)
  
    return () => {
      socket.off("publishVote", handlePublishVote)
    }
  }, [candidates])

  // socket.on("publishVote", (candidateid)=>{
  //   dispatch(addVote(candidateid))
  // })

  return (
  <div className='app'>
    <Nav/>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='votes' element={<Vote/>}/>
      <Route path='statistics' element={<Statistics/>}/>
      <Route path='/' element={<Navigate to={'/login'}/>}/>
    </Routes>
    <ToastContainer/>
  </div>)
}

export default App