import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, status } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return <div className={status}>{message}</div>
}

export default Notification