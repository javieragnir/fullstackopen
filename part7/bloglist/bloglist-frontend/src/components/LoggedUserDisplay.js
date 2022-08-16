import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

const LoggedUserDisplay = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }

  const marginLeft = {
    marginLeft: 5
  }

  return (
    <span style={padding}>
      <strong>{user.username} logged in</strong>
      <Button onClick={handleLogout} variant="secondary" type="submit" style={marginLeft}>logout</Button>
    </span>
  )
}

export default LoggedUserDisplay