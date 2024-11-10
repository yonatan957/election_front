import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DataStatus, userState } from "../../types/redux"

const initialState:userState ={
    error:null,
    status:DataStatus.IDLE,
    user:null
}

const fetchLogin = createAsyncThunk('user/login',
    async (userData:{userName:string, password:string}, thunkApi) => {
        try {
            const res = await fetch('http://localhost:2222/api/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'aplication/json'
                },
                body:JSON.stringify(userData)
            })
            if (!res.ok){
                thunkApi.rejectWithValue("can't login, please try again")
            }
            const data = res.json();
            thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue("can't login, please try again")

        }
    }
)
const fetchregister = createAsyncThunk('user/register',
    async (userData:{userName:string, password:string, isAdmin:boolean}, thunkApi) => {
        try {
            const res = await fetch('http://localhost:2222/api/users/register',{
                method:'POST',
                headers:{
                    'Content-Type':'aplication/json'
                },
                body:JSON.stringify(userData)
            })
            if (!res.ok){
                thunkApi.rejectWithValue("can't login, please try again")
            }
            const data = res.json();
            thunkApi.fulfillWithValue(data)
        } catch (error) {
            thunkApi.rejectWithValue("can't login, please try again")

        }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder:ActionReducerMapBuilder<userState>)=>{
        builder.addCase()
    }
})