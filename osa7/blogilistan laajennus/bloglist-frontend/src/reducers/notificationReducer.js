import { createSlice } from '@reduxjs/toolkit'

const initialNotification = { message: null, error: false }
let timeoutId = 0

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotification,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        deleteNotification(state, action) {
            return initialNotification
        }
    }
})

const setNotification = (message, time) => (dispatch) => {
    clearTimeout(timeoutId)
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => {
        dispatch(deleteNotification())
    }, time * 1000)
}

export default notificationSlice.reducer
export const { createNotification, deleteNotification } = notificationSlice.actions
export { setNotification }
