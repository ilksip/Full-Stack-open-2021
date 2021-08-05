import React from "react"
const Notification = ({ message }) => {
    if (message) {
        return(<div style={{ backgroundColor: "#eee", fontSize: 25, padding:10, margin:10 }}>{message}</div>)
    }
    return(null)
}

export default Notification