import React from "react";
const Users = ({users}) => {
	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>
							<b>blogs created</b>
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
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
