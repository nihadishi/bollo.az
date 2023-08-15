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
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./assets/context/userContext";
import Addproduct from "./layouts/Addproduct/Addproduct";
import {ShoppingContextProvider } from "./assets/context/shoppingContext";
import Shopping from "./layouts/Shopping/Shopping";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/productDetailsPage";
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ShoppingContextProvider>
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <div className="App">
        <Navbar/>
        <Shopping/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <AboutPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <ProductsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/products/id/:productID"
            element={
              <>
                <ProductDetailsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/liked"
            element={
              <>
                <BasketPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <SignupPage />
              </>
            }
          />
          <Route
            path="/profile"
            element={
                <ProfilePage />
            }
          />
          <Route
            path="/3dsecure.azericard/payment"
            element={
                <PaymentPage/>
            }
          />
          <Route
            path="/3dsecure.azericard/onlinepayment"
            element={
                <PaymentPage/>
            }
          />
          <Route
            path="/3dsecure.azericard/auth"
            element={
                <PaymentPage/>
            }
          />
          <Route
            path="*"
            element={
              <>
                <ErrorPage />
              </>
            }
          />
        </Routes>
      </div>
    </UserContextProvider>
    </ShoppingContextProvider>
  );
}

export default App;
