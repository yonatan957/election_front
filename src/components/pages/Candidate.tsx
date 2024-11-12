import { socket } from "../../main"
import { updateVote, useAppDispatch, useAppSelector } from "../../redux/store"
import { ICandidate } from "../../types/candidate"
import './pages.css'
interface props{
    candidate:ICandidate
}

export default function Candidate({candidate}:props) {
    const {user} = useAppSelector((state)=> state.user)
    const dispatch = useAppDispatch()
    const vote = async()=>{
      try {
        const response = await fetch("http://localhost:2222/api/candidates/vote",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("token") as string
          },
          body:JSON.stringify({candidate_id:candidate._id})
        })
        if(!response.ok)throw new Error("faild to vote")
        socket.emit('newVote',{candidate:candidate})
        dispatch(updateVote({hasVoted:true, votedFor:candidate._id}))
      } catch (error) {
        console.log((error as Error).message)
      }
    }
  return (
    <div className="onecandidate">
        <h3>{candidate.name}</h3>
        <img src={candidate.image}/>
        <h4>{candidate.votes}</h4>
        { !user?.hasVoted && <button onClick={vote}>vote</button>}
        { user?.hasVoted && user?.votedFor== candidate._id ? <p>you vote me!!!</p>: <p>you didn't vote me</p>}
    </div>
  )
}