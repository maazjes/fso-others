import { createNotification, deleteNotification } from './reducers/notificationReducer'

const newNotification = (message, dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
        dispatch(deleteNotification(''))
    }, "5000")
}

export default newNotification