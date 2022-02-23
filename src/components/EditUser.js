import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, selectEditOn, selectCurrentUser, setCurrentUserId, setCurrentUser, selectUsers, setEditOn} from "../features/users/userSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

// (props) .... props.id is equivalent to ({id})
// read about destructing in javascript

const EditUser = (props) => {
    const dispatch = useDispatch();
    const currentUsers = useSelector(selectUsers);
    const currentUser = useSelector(selectCurrentUser);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    const authorizationToken = '6ca4cb98d7ac419c0d66dab409b9141c95d6ea564ad807155bb3e5a52e6b0911';

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.userId);
        fetch(`https://gorest.co.in/public/v2/users/${props.userId}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "6ca4cb98d7ac419c0d66dab409b9141c95d6ea564ad807155bb3e5a52e6b0911",
          },
          body: JSON.stringify({
            'name': name,
            'email': email,
            'status': status,
          }),
        })
        .then((response) => response.json())
        .then((data) => console.log(data));

          const newUsers = currentUsers.map((user) => {
              if(user.id === props.userId) {
                  return {id: user.id, name: name, email: email, gender: gender, status: status};
              }
              return user;
          })
          dispatch(getUsers(newUsers));
          props.setModal(false);
    }
    
    

  return (
    <>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <TextField
          sx={{ border: 5, borderColor: "white" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          sx={{ border: 5, borderColor: "white" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Box sx={{ border: 5, borderColor: "white" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(event) => setGender(event.target.value)}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ border: 5, borderColor: "white" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(event) => setStatus(event.target.value)}
            >
              <MenuItem value={"active"}>active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            border: 10,
            borderColor: "White",
            borderRight: 25,
            borderRightColor: "white",
          }}
        >
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditUser;
