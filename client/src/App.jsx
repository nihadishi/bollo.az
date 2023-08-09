import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Navbar from "./layouts/Navbar/Navbar";
import "./app.scss";
import SignupPage from "./pages/LoginPage/SignupPage";
import BasketPage from "./pages/BasketPage/BasketPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Footer from "./layouts/Footer/Footer";
import { IsLoginProvider } from "./assets/context/isLoginContext";
import { FavoriteProvider } from './assets/context/FavoriutesContext'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; 


function App() {
 
  return (
      <IsLoginProvider>
        
        <Toaster position="bottom-right" toastOptions={{duration:2000}}/>
        <div className="App">
          <Routes>
            <Route path="/" element={<><Navbar /><HomePage /><Footer/></>} />
            <Route path="/home" element={<><Navbar /><HomePage /><Footer/></>} />
            <Route path="/products" element={<><Navbar /><ProductsPage/><Footer/></>} />
            <Route path="/account" element={<><Navbar /><ProfilePage /><Footer/></>} />
            <Route path="/login" element={<><Navbar /><LoginPage /></>} />
            <Route path="/register" element={<><Navbar /><SignupPage /></>} />
            <Route path="/liked" element={<><Navbar /><BasketPage /><Footer/></>} />
            <Route path="/about" element={<><Navbar /><AboutPage /><Footer/></>} />
            <Route path="*" element={<><Navbar /><ErrorPage /></>} />
          </Routes>
        </div>
      </IsLoginProvider>
  )
}

export default App;
