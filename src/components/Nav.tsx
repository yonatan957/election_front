import React from 'react'
import { NavLink } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'

export default function Nav() {
    const user = useAppSelector((state:RootState)=>state.user)
  return (
    <div className='nav'>
        {user.user?
        <>
            <NavLink to={'/votes'}>votes</NavLink>
            {user.user.isAdmin && <NavLink to={'/statistics'}>statistics</NavLink>}
            <button onClick={()=>{alert("log out sucssefully")}}>log out</button>
        </>:<>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/register'}>register</NavLink>
        </>}
    </div>
  )
}
