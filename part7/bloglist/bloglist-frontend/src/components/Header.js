import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Header = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default Header