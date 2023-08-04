import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Navbar from "./layouts/Navbar/Navbar";

import "./app.scss";
import SignupPage from "./pages/LoginPage/SignupPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="home" element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="account" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
