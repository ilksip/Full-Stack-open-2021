const Message = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="message">
        {message}
      </div>
    )
}

const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
}
const exports = {Message,  ErrorMessage}
export default exports