import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const userList = useSelector(state => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>name</td>
            <td><strong>blogs created</strong></td>
          </tr>
          {userList.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList