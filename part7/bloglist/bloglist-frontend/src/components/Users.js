import React, { useEffect, useState } from "react";
import userService from "../services/users";

const Users = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		(async () => {
			const allUsers = await userService.getAll();
			console.log(allUsers);
			setUsers(allUsers);
		})();
	}, []);
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
								<td>{user.name}</td>
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
