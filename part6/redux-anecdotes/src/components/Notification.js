import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        notification 
        ? <div style={style}>
            {notification.text}
        </div>
        : null
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification