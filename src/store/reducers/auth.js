import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null
}

const authSlice = createSlice(
    {
        name : 'auth',
        initialState,
        reducers: {
            logIn(state, action){
                state.token = action.payload;
            },
            logOut(state, action){
                state.token = null;
            }
        }
    }
);

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;