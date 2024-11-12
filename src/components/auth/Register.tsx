import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './auth.css'

export default function Register() {
  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const {user} = useAppSelector((state)=> state.user)
  const navigate = useNavigate()
  const send = async()=>{
    try {
      const response = await fetch("http://localhost:2222/api/users/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
          userName,
          password,
          isAdmin
        })
      })
      if(!response.ok){
        alert("faild to register")
        throw new Error("faild to register")
      }
      navigate('/login')
    } catch (error) {
      console.log((error as Error).message)
    }
  }
  useEffect(()=>{
    if(user?._id){
      navigate('/votes')
    }
  },[])
  return (
    <div className='page'>
      <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName} />
      <input type="password" placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <br />
      <label htmlFor="">Are you Admin?</label>
      <input type="checkbox" onChange={(e)=>{setIsAdmin(e.target.checked)}}  checked={isAdmin}/>
      <button onClick={send}>Register</button>
    </div>
  )
}
