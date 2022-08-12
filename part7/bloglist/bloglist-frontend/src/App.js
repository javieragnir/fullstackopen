import { useEffect } from 'react'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

/* import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom' */
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <BlogList />
    </div>
  )
}

export default App
