const ErrorNotification = ({errorMessage}) => {
  if (errorMessage === null) {
    return
  } 

  return (
    <div className="error">{errorMessage}</div>
  )
}

export default ErrorNotification