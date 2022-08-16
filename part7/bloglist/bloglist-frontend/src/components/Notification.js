import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, status } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  let variant = ''

  switch(status) {
  case 'success':
    variant = 'success'
    break
  case 'error':
    variant = 'danger'
    break
  }

  return <Alert variant={variant}>{message}</Alert>
}

export default Notification