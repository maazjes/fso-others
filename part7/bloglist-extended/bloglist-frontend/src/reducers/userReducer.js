import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
