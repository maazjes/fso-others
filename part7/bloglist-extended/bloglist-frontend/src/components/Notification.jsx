import '../index.css'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

function Notification() {
  const message = useSelector((state) => state.notification)
  return (
    <div>
      {message.message && (
        <Alert className="mt-4" variant={message.error ? 'danger' : 'success'}>
          {message.message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
