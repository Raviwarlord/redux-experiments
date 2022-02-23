import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setNewUserOn,
} from "../features/users/userSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

// (props) .... props.id is equivalent to ({id})
// read about destructuring in javascript

const NewUser = ({hideModal}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const authorizationToken =
    "6ca4cb98d7ac419c0d66dab409b9141c95d6ea564ad807155bb3e5a52e6b0911";

  const handleSubmit = (event) => {
      event.preventDefault();
    fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authorizationToken,
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        email: email,
        status: status,
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
    dispatch(setNewUserOn(false));
    hideModal(false);
  };

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
        <Box sx={{ border: 5, borderColor: "white"}}>
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
        <Box sx={{border: 10, borderColor: 'White', borderRight:25, borderRightColor: "white"}}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default NewUser;
