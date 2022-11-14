const Notification = ({successMessage}) => {
  if (successMessage === null) {
    return
  } 

  return (
    <div className="success">{successMessage}</div>
  )
}

export default Notification