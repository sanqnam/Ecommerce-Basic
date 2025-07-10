import { createSlice } from "@reduxjs/toolkit"

const popupStat = {
    isPopup :false,
    product:{}
}
const popupSlice = createSlice({
    name : 'popup',
    initialState: popupStat,
    reducers:{
        SHOW_POPUP: (state,action) => {
            state.isPopup = true
            state.product = action.payload
        },
        HIDE_POPUP: (state) =>{
            state.isPopup = false
            state.product = {}
        }
    }
})
export const {HIDE_POPUP, SHOW_POPUP} = popupSlice.actions
export default popupSlice.reducer