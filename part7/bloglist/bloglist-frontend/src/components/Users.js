import React from 'react'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>Blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
