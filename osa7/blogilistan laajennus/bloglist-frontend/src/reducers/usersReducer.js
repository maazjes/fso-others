import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer.js'
import blogService from '../services/blogs.js'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export default usersSlice.reducer
export const { setUsers } = usersSlice.actions
