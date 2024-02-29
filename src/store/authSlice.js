import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user : null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        userLoggedIn : (state, action) => {
            state.user = action.payload
        },
        userLoggedOut : (state) => {
            state.user = null
        }
    }
})


export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;