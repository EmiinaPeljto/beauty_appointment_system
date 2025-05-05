import React, {useEffect, useState} from "react";
import useFetchUsers from "../hooks/useFetchUsers";

const UserTable = () => {

    const { users, loading, error } = useFetchUsers();


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