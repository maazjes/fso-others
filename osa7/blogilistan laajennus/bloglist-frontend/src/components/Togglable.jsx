import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => toggleVisibility)

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="primary" type="submit" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button className="mt-1" variant="secondary" type="submit" onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        </div>
    )
})

export default Togglable
