export interface IUser extends Document{
    userName:string
    isAdmin:boolean
    hasVoted:boolean
    votedFor:string | null
}