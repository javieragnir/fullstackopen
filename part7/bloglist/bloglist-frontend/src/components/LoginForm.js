import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setSuccessNotification('logged in successfully', 5))
      navigate('/')

    } catch (exception) {
      dispatch(setErrorNotification('wrong username or password', 5))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
            login
        </button>
      </form>
    </div>
  )
}


export default LoginForm

