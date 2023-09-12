import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Navbar from "./layouts/Navbar/Navbar";
import "./app.scss";
import SignupPage from "./pages/LoginPage/SignupPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Footer from "./layouts/Footer/Footer";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./assets/context/userContext";
import { ShoppingContextProvider } from "./assets/context/shoppingContext";
import Shopping from "./layouts/Shopping/Shopping";
import ProductDetailsPage from "./pages/ProductDetailsPage/productDetailsPage";
import ScrollToTop from "./assets/ScrollToTop/ScrollToTop.jsx";
import { BlendingContextProvider } from "./assets/context/blendContext";
import { TotalPriceProvider } from "./assets/context/TotalPriceContext";
import { ShoppingFormContextProvider } from "./assets/context/shopFormContext";
import PaymentPrivate from "./assets/PrivateRoutes/PaymentPrivate";
import OTPPrivate from "./assets/PrivateRoutes/OTPPrivate";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import { EditingIsOpenProvider } from "./assets/context/editinIsOpenContext";
import OrderPageFromCustomers from "./pages/OrderPageFromCustomers/OrderPageFromCustomers";
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ShoppingContextProvider>
      <TotalPriceProvider>
        <BlendingContextProvider>
          <UserContextProvider>
            <EditingIsOpenProvider>
              <ShoppingFormContextProvider>
                <Toaster
                  position="bottom-right"
                  toastOptions={{ duration: 2000 }}
                />
                <div className="App">
                  <ScrollToTop />
                  <Navbar />
                  <Shopping />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <HomePage />
                        </>
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        <>
                          <HomePage />
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
                        </>
                      }
                    />
                    <Route
                      path="/products/id/:productID"
                      element={
                        <>
                          <ProductDetailsPage />
                        </>
                      }
                    />
                    <Route
                      path="/products/search/:searchText"
                      element={
                        <>
                          <ProductsPage />
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
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile-orders" element={<OrderPageFromCustomers />} />
                    <Route path="/profile-edit" element={<EditProfilePage />} />
                    <Route
                      path="/3dsecure.azericard/payment"
                      element={<PaymentPrivate />}
                    />
                    <Route
                      path="/3dsecure.azericard/auth"
                      element={<OTPPrivate />}
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
              </ShoppingFormContextProvider>
            </EditingIsOpenProvider>
          </UserContextProvider>
        </BlendingContextProvider>
      </TotalPriceProvider>
    </ShoppingContextProvider>
  );
}

export default App;
