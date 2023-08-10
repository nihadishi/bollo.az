import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../assets/context/userContext";
const ProfilePage = () => {

  const {user} = useContext(UserContext)
  return(<>
  <h1>Profile</h1>
  {!!user &&(<h2>{user.fullname}</h2>) }
  </>)
  
}

export default ProfilePage