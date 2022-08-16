import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'

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

  return (
    <span style={padding}>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </span>
  )
}

export default LoggedUserDisplay