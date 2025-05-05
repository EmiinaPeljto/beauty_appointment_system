import React, {useEffect, useState} from "react";
import axios from "axios";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/gen/users/all");
                setUsers(response.data);
            } catch (err) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <table boarder="1" style={{width: "100%", textAlign: "left"}}>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;