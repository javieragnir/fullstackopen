import { useEffect } from 'react'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

import {
  Routes,
  Route,
  Link,
  useMatch,
  Navigate
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoggedUserDisplay from './components/LoggedUserDisplay'
import { initializeUserList } from './reducers/userListReducer'
import User from './components/User'
import BlogPage from './components/BlogPage'

const App = () => {
  const user = useSelector(state => state.user)
  const userList = useSelector(state => state.userList)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const userToView = userMatch
    ? userList.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogToView = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Notification />
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <LoggedUserDisplay />
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/" element={user ? <Navigate replace to="/blogs" /> : <LoginForm />}/>
        <Route path="/login" element={user ? <Navigate replace to="/blogs" /> : <LoginForm />} />
        <Route path="/blogs/:id" element={user ? <BlogPage blog={blogToView}/> : <Navigate replace to="/login" />} />
        <Route path="/blogs" element={user ? <BlogList /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={user ? <User user={userToView} /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={user ? <UserList /> : <Navigate replace to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
