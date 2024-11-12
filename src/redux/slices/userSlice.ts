import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DataStatus, updateVote, userState } from "../../types/redux"
import { IUser } from "../../types/user"

const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
};

export const fetchLogin = createAsyncThunk('user/login',
    async (userData: { userName: string, password: string }, thunkApi) => {
        try {
            const res = await fetch('http://localhost:2222/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) {
                thunkApi.rejectWithValue("can't login, please try again");
            }
            const data = await res.json();
            thunkApi.fulfillWithValue(data);
            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            thunkApi.rejectWithValue(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
);

export const fetchregister = createAsyncThunk('user/register',
    async (userData: { userName: string, password: string, isAdmin: boolean }, thunkApi) => {
        try {
            const res = await fetch('http://localhost:2222/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) {
                console.log(res)
                return thunkApi.rejectWithValue("can't register, please try again");
            }
            const data = await res.json();
            return thunkApi.fulfillWithValue(data);
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser:(state, action: PayloadAction) => {
            state.user = null
        },
        updateVote:(state, action:PayloadAction<updateVote>)=>{
            state.user!.hasVoted = action.payload.hasVoted
            state.user!.votedFor = action.payload.votedFor
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = DataStatus.LOADING;
            state.error = null;
            state.user = null;
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = DataStatus.SUCCESS;
            state.error = null;
            state.user = action.payload as IUser;
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.status = DataStatus.FAILED;
            state.error = action.payload as string;
            state.user = null;
        })
        .addCase(fetchregister.pending, (state) => {
            state.status = DataStatus.LOADING;
            state.error = null;
            state.user = null;
        })
        .addCase(fetchregister.fulfilled, (state, action) => {
            state.status = DataStatus.SUCCESS;
            state.error = null;
            state.user = action.payload as IUser;
        })
        .addCase(fetchregister.rejected, (state, action) => {
            state.status = DataStatus.FAILED;
            state.error = action.payload as string;
            state.user = null;
        });
    },
});

export default userSlice;
