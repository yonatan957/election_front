import { IUser } from "./user"

export enum DataStatus{
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    FAILD = "FAILD",
    IDLE = "IDLE"
}

export interface userState{
    error:string | null
    status:DataStatus
    user:null |IUser
}