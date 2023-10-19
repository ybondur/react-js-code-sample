// UserContext.js
import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => setUsers([...users, user]);

    const deleteUser = (userId) => setUsers(users.filter(user => user.id !== userId));

    return (
        <UserContext.Provider value={{ users, addUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UserContext);
};

// UserList.js
import React from 'react';
import { useUsers } from './UserContext';

const UserList = () => {
    const { users, deleteUser } = useUsers();

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// AddUser.js
import React, { useState } from 'react';
import { useUsers } from './UserContext';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { addUser } = useUsers();

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({ id: Date.now(), name, email });
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

// App.js
import React from 'react';
import { UserProvider } from './UserContext';
import UserList from './UserList';
import AddUser from './AddUser';

const App = () => (
    <UserProvider>
        <h1>User Dashboard</h1>
        <AddUser />
        <UserList />
    </UserProvider>
);

export default App;
