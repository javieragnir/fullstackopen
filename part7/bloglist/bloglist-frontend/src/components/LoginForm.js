import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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

  const marginTop = {
    marginTop: 10
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form className="loginForm" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" id="loginButton" type="submit" style={marginTop}>
              login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm

