import { useAppSelector } from "../../redux/store"
import { ICandidate } from "../../types/candidate"

interface props{
    candidate:ICandidate
}

export default function Candidate({candidate}:props) {
    const {user} = useAppSelector((state)=> state.user)
  return (
    <div>
        <h3>{candidate.name}</h3>
        <img src={candidate.image}/>
        <h4>{candidate.votes}</h4>
        { !user?.hasVoted && <button>vote</button>}
        { user?.hasVoted && user?.votedFor== candidate._id ? <p>you vote for me!!!</p>: <p>you didn't vote for me</p>}
    </div>
  )
}