import { useSelector } from 'react-redux'

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList