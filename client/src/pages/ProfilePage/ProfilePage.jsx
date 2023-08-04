import { Link, useNavigate } from "react-router-dom";
import { useIsLogin } from "../../assets/context/isLoginContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useIsLogin();
  const handleLoginToggle = () => {
    setIsLogin(false);
  };
  return (
    isLogin? <>
    <div>
      <h1>Profile</h1>
      <p>Is User Logged In: {isLogin ? 'Yes' : 'No'}</p>
      <button onClick={handleLoginToggle}>
        {isLogin ? 'Log Out' : 'Log In'}
      </button>
    </div>
    </>:
    navigate('/login')
    
  );
}

export default ProfilePage