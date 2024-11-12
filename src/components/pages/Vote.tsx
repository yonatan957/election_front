import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchcandidates } from '../../redux/slices/candidatesSlice';
import Candidate from './Candidate';
import { useNavigate } from 'react-router-dom';

export default function Vote() {
  const {user} = useAppSelector((state)=> state.user)
  const candidates = useAppSelector((state:RootState)=> state.cadidates.candidates)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user?._id){navigate('/login')}
    dispatch(fetchcandidates())
  },[user])
  return (
    <div className='candidates'>
      {candidates? candidates!.map(c => <Candidate candidate={c} key={c._id}></Candidate>): null}
    </div>
  )
}
