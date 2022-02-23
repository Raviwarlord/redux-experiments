import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';
import UserProfile from './UserProfile';
import { 
    setCurrentPage, 
    selectUsers, 
    selectCurrentUser, 
    getUsers, 
    selectEditOn, 
    setEditOn,
    setCurrentUserId,
    selectCurrentUserId,
    setUserProfileOn,
    selectIsUserProfileOn,
    setNewUserOn,
    selectNewUserOn,
} from "../features/users/userSlice";
import EditUser from "./EditUser";
import NewUser from "./NewUser";



const UsersTable = () => {
    const dispatch = useDispatch();

    const [showAddNewuser, setShowAddNewUser] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const users = useSelector(selectUsers);
    const currentUser = useSelector(selectCurrentUser);
    const currentUserId = useSelector(selectCurrentUserId);
    const isEditOn = useSelector(selectEditOn);
    const isUserProfileOn = useSelector(selectIsUserProfileOn);
    const isNewUserOn = useSelector(selectNewUserOn);
    

    const handleChange = (event, page) => {
        dispatch(setCurrentPage(page));
    }

    const viewUser = (id) => {
        dispatch(setCurrentUserId(id));
        setShowUser(true);
    };

    const deleteUserTemp = (id) => {
      dispatch(setCurrentUserId(id));
      setShowDeleteUser(true);
    }

    const deleteUser = (id) => {
        const autherizationToken = 'Bearer ' + '6ca4cb98d7ac419c0d66dab409b9141c95d6ea564ad807155bb3e5a52e6b0911';
        
        fetch(`https://gorest.co.in/public/v2/users/${id}`, {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': autherizationToken,
            }
        })
          .then((response) => console.log(response))
        const newUsers = users.filter((item) => item.id !== id);
        dispatch(getUsers(newUsers));
        setShowDeleteUser(false);
    }

    const editUser = (id) => {
        dispatch(setCurrentUserId(id));
        setShowEditUser(true);
    }

    if(users === null) return <p>Loading</p>
    if(currentUserId !== null && isEditOn === true) return <EditUser userId={currentUserId}/>
    // if (currentUserId !== null && isUserProfileOn === true) return <UserProfile userId={currentUserId}/>;
    if(isNewUserOn === true) return <NewUser />
        return (
          <>
            <TableContainer
              sx={{
                border: 2,
                borderColor: "black",
                marginTop: 10,
                margin: 2,
              }}
              component={Paper}
            >
              <Table
                sx={{
                  minWidth: 1000,
                  backgroundColor: "#BFFFF0",
                }}
                aria-label="simple table"
              >
                <TableHead
                  sx={{
                    fontSize: "big",
                    fontWeight: "bold",
                    borderBottom: 4,
                    borderColor: "blue",
                    backgroundColor: "#BFF0FF",
                  }}
                >
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => setShowAddNewUser(true)}
                      >
                        Add New User
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.gender}</TableCell>
                      <TableCell align="right">{user.status}</TableCell>
                      <TableCell>
                        <Stack spacing={2} direction="row">
                          <Button
                            variant="outlined"
                            onClick={() => viewUser(user.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => editUser(user.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => deleteUserTemp(user.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={10}
                color="primary"
                page={1}
                onChange={handleChange}
              />
            </TableContainer>
            {/* ===========Add New User Dialogue Starts Here============ */}
            <Dialog
              open={showAddNewuser}
              onClose={() => setShowAddNewUser(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Add New User</DialogTitle>
              <DialogContent>
                <NewUser hideModal={setShowAddNewUser} />
              </DialogContent>
            </Dialog>
            {/* ===========Add New User Dialogue Ends Here============ */}

            {/* ===========Show User Dialogue Start Here============ */}
            <Dialog
              open={showUser}
              onClose={() => setShowUser(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                User Information
              </DialogTitle>
              <DialogContent>
                <UserProfile userId={currentUserId} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowUser(false)} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            {/* ===========Show User Dialogue Ends Here============ */}

            {/* ===========Edit User Dialogue Starts Here============ */}
            <Dialog
              open={showEditUser}
              onClose={() => setShowEditUser(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <EditUser userId={currentUserId} setModal={setShowEditUser} />
              </DialogContent>
            </Dialog>
            {/* ===========Edit User Dialogue Ends Here============ */}

            {/* ===========Delete User Dialogue Start Here============ */}
            <Dialog
              open={showDeleteUser}
              onClose={() => setShowDeleteUser(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Do you really want to delete the user?
              </DialogTitle>
              <DialogContent>
                <UserProfile userId={currentUserId} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => deleteUser(currentUserId)} autoFocus>
                  Agree
                </Button>
                <Button onClick={() => setShowDeleteUser(false)}>
                  Disagree
                </Button>
              </DialogActions>
            </Dialog>
            {/* ===========Delet User Dialogue Ends Here============ */}
          </>
        );
};

export default UsersTable;