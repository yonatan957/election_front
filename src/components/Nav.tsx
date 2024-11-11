import React from 'react'
import { NavLink } from 'react-router-dom'
import { initUser, RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useDispatch } from 'react-redux'

export default function Nav() {
    const user = useAppSelector((state:RootState)=>state.user.user)
    const dispatch = useDispatch()
    const logout = ()=>{
      localStorage.removeItem("token")
      dispatch(initUser())
    }
  return (
    <div className='nav'>
        {user?
        <>
            <NavLink to={'/votes'}>votes</NavLink>
            {user.isAdmin && <NavLink to={'/statistics'}>statistics</NavLink>}
            <button onClick={logout}>log out</button>
        </>:<>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/register'}>register</NavLink>
        </>}
    </div>
  )
}
