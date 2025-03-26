import React, { useEffect, useState } from 'react';
import apiRequest from './helper/ApiInterceptor';

const UserList = ({ token, role }) => {
    const [users, setUsers] = useState([]);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiRequest.get('/users', { page });
                setUsers(response.data.allUsers);
                setTotalUsersCount(response.data.totalUsersCount);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [page, token]);

    if (role === 'user') {
        // const user = Array.isArray(users) ? users.find(user => user.role === 'user') : null;

        return (
            <div>
                <h2>User Details</h2>
                {users ? (
                    <div>
                        <p>Username: {users.username}</p>
                        <p>Email: {users.email}</p>
                    </div>
                ) : (
                    <p>No user details available.</p>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username} - {user.email}</li>
                ))}
            </ul>
            <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button type="button" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(totalUsersCount / 10)}>Next</button>
        </div>
    );
};

export default UserList;