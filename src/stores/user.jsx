import { createSlice } from "@reduxjs/toolkit"

const userDefault = {
    user : {},
    count : 0
}
const userSlice = createSlice({
    name: 'user',
    initialState: userDefault,
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
        },
        logout: (state) =>{
            state.user = {}
        },
        tang :(state) =>{
            state.count += 1
        }
    }
})

export const {login, logout,tang} = userSlice.actions
export default userSlice.reducer