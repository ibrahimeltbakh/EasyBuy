import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
    const storedToken = localStorage.getItem("userToken");
    return storedToken ? storedToken : null
}
const userSlice = createSlice({
    name: "userSlice",
    initialState: getInitialToken,
    reducers: {
        setToken: (state, action) => action.payload,
        logout: () => {
            localStorage.removeItem("userToken");
            return null;
        }
    }
})
export const { setToken, logout } = userSlice.actions
export default userSlice.reducer