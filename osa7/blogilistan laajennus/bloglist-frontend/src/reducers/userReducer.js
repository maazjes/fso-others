import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer.js'
import blogService from '../services/blogs.js'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const setUser = (user) => (dispatch) => {
    if (user !== null) {
        blogService.setToken(user.token)
    }
    dispatch(userSlice.actions.setUser(user))
}

export default userSlice.reducer
