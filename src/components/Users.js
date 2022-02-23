import { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getUsers, selectPage } from '../features/users/userSlice'
import UsersTable from './UsersTable';



const Users = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectPage);

    //function will call the api and dispatch users information to the store
    const fetchUsers = () => {
        fetch(`https://gorest.co.in/public/v2/users?page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
            dispatch(getUsers(data));
        });
    }

    //is used to fetch users before rendering the dUsers componenet
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    return (
        <div className="App">
            <header className="App-header">
            <UsersTable />
            </header>
        </div>
    );
};

export default Users;
