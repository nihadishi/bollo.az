import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../assets/context/userContext";
import axios from "axios";
const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.post("logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  if (user) {
    return(
    <>
      {user.fullname?<h1>{user.fullname}</h1>:<h1>Fullname</h1>}
      {user.region?<h1>{user.region}</h1>:<h1>region</h1>}
      {user.email?<h1>{user.email}</h1>:<h1>email</h1>}
      {user.number?<h1>{user.number}</h1>:<h1>number</h1>}
      <button onClick={logoutUser}>Log Out</button>
    </>
    )
  } 
  else {
    return (
      <>
        <h1>You logged out</h1>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
      </>
    );
  }
};

export default ProfilePage;
