import '../index.css'
import { useState, useEffect } from 'react'

function Notification({ message }) {
    const [run, setRun] = useState(false)
    useEffect(() => {
        if (message.message !== null) {
            setRun(true)
            setTimeout(() => {
                setRun(false)
            }, '3000')
        }
    }, [message])
    return (
        run ? (
            <div className={message.error ? 'error' : 'completed'}>
                {message.message}
            </div>
        ) : <div />
    )
}

export default Notification
