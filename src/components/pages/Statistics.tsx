import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../../redux/store';
import { ColumnChart } from '@opd/g2plot-react';
import './pages.css'

export default function Statistics() {
  const {user} = useAppSelector((state)=> state.user)
  const navigate = useNavigate()
  const { candidates } = useAppSelector((state) => state.cadidates);

  useEffect(()=>{
    if(user?._id && !user?.isAdmin){navigate('/votes')}
    if(!user?._id){navigate('/login')}
  },[])
  const config = {    
    xField: "name",
    yField: "votes",
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
  };
  return (
    <div className='statistics'>
    <h1>Statistics</h1>

    <ColumnChart
      {...config}
      height={400} 
      data={candidates!.map((c) => ({ name: c.name, votes: c.votes }))}
    />
  </div>
  )
}
