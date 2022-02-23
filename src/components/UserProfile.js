import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, selectCurrentUser, selectIsUserProfileOn, setUserProfileOn, setCurrentUserId} from "../features/users/userSlice";


// (props) .... props.id is equivalent to ({id})
// read about destructing in javascript

const UserProfile = (props) => {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
      fetch(`https://gorest.co.in/public/v2/users/${props.userId}`)
          .then((response) => response.json())
          .then((user) => {
              dispatch(setCurrentUser(user));
          });

    }, []);

    const goBack = () => {
      dispatch(setCurrentUserId(null));
      dispatch(setUserProfileOn(false));
    }
  if(currentUser === null) return <p>Loading User</p>
  return (
    <>
       <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
      <p>Gender: {currentUser.gender}</p>
      <p>Status: {currentUser.status}</p>
    </>
  );
};

export default UserProfile;
