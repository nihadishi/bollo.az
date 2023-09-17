import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { UserContext } from "../../assets/context/userContext";
import defaultProfilePhoto from "../../assets/UploadImage/img/OIP.jpeg";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.scss";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import bg1 from "./img/bgrandom/1.jpg";
import bg2 from "./img/bgrandom/2.jpg";
import bg3 from "./img/bgrandom/3.jpg";
import bg4 from "./img/bgrandom/4.jpg";
import bg5 from "./img/bgrandom/5.jpg";
import bg6 from "./img/bgrandom/6.jpg";
import Loading from "../../layouts/Loading/Loading";
import Footer from "../../layouts/Footer/Footer";
import Addproduct from "../../layouts/Addproduct/Addproduct";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { EditingIsOpen } from "../../assets/context/editinIsOpenContext";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import { BackendUrlContext } from "../../assets/context/backendUrlContext";

const ProfilePage = () => {
  let currentDate = new Date();
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const { editing, setEditing } = useContext(EditingIsOpen);
  const { AllProductsFromDatabase } = useContext(ShoppingContext);
  const { baseUrl } = useContext(BackendUrlContext);

  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const [adding, setAdding] = useState(false);
  const profileImage = `${baseUrl}/profilephotos/` + user?.image;

  useEffect(() => {
    const randomImage = () => {
      const randomNumber = Math.floor(Math.random() * 6);
      const bgRandom = [bg1, bg2, bg3, bg4, bg5, bg6];
      setBackgroundImage(`url(${bgRandom[randomNumber]})`);
    };
    randomImage();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) clearInterval(timeout);
      setLoading(false);
    }, 1000);
  });

  const handleEditClick = (e) => {
    setEditing(true);
  };
  const handleAddClick = (e) => {
    setAdding(!adding);
  };

  const logoutUser = async () => {
    try {
      await axios.post("user/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShow = () => setBasicModal(!basicModal);
  if (!loading) {
    if (user) {
      if (editing) {
        navigate("/profile-edit");
      } else {
        return (
          <>
            <div className="gradient-custom-2 profile">
              <MDBContainer className="py-5 h-100 w-100 ">
                <MDBRow className="justify-content-center align-items-center h-100 ">
                  <MDBCol lg="9" xl="11">
                    <MDBCard>
                      <div
                        className="rounded-top text-white d-flex flex-row backingPhoto"
                        style={{
                          height: "200px",
                          backgroundImage,
                          backgroundBlendMode: "darken",
                          backgroundColor: "rgba(0, 0, 0, 0.644)",
                        }}
                      >
                        <div
                          className="ms-4 mt-5 d-flex flex-column"
                          style={{ width: "150px" }}
                        >
                          <MDBCardImage
                            src={
                              user?.image ? profileImage : defaultProfilePhoto
                            }
                            alt="Image"
                            className="mb-2 img-thumbnail overflow-hidden"
                            // fluid
                            style={{
                              width: "100%",
                              height: "100%",
                              zIndex: "1",
                            }}
                          />
                        </div>
                        <div className="ms-3" style={{ marginTop: "90px" }}>
                          <MDBTypography tag="h2">
                            {user?.fullname}
                          </MDBTypography>
                          <MDBCardText tag="h4">
                            ({user?.city}) {user?.region}
                          </MDBCardText>
                        </div>

                        {/* logout */}
                        <div style={{ position: "absolute", right: "0" }}>
                          <MDBBtn
                            style={{ height: "40px" }}
                            onClick={toggleShow}
                            color="danger"
                          >
                            Log out
                          </MDBBtn>
                          <MDBModal
                            show={basicModal}
                            setShow={setBasicModal}
                            tabIndex="1"
                          >
                            <MDBModalDialog>
                              <MDBModalContent>
                                <MDBModalHeader>
                                  <MDBModalTitle
                                    style={{ color: "black" }}
                                    className="d-flex align-items-center justify-content-center"
                                  >
                                    Are you sure you want to log out?
                                  </MDBModalTitle>
                                  <MDBBtn
                                    className="btn-close p-0"
                                    color="none"
                                    onClick={toggleShow}
                                  ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody
                                  style={{ color: "black" }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  If you log out, you will need to log in again.
                                </MDBModalBody>

                                <MDBModalFooter>
                                  <MDBBtn
                                    color="secondary"
                                    onClick={toggleShow}
                                    style={{ height: "40px" }}
                                  >
                                    Cancel
                                  </MDBBtn>
                                  <MDBBtn
                                    style={{ height: "40px" }}
                                    color="danger"
                                    onClick={logoutUser}
                                  >
                                    Log out
                                  </MDBBtn>
                                </MDBModalFooter>
                              </MDBModalContent>
                            </MDBModalDialog>
                          </MDBModal>
                        </div>
                      </div>
                      <div
                        className="p-4 text-black"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div className="d-flex justify-content-between align-items-center text-center py-1 margi">
                          <div style={{ transition: "1s" }}>
                            <MDBBtn
                              outline
                              color="dark"
                              style={{ height: "36px", overflow: "visible" }}
                              onClick={handleEditClick}
                              tabIndex="2"
                            >
                              Edit profile
                            </MDBBtn>
                          </div>
                          <div>
                            <MDBCardText className="mb-1 h5">
                              {
                                AllProductsFromDatabase.filter(
                                  (product) => product.userid === user._id
                                ).filter((product) => {
                                  const expirationDate = new Date(
                                    product.productexpirationdate
                                  );
                                  return currentDate < expirationDate;
                                }).length
                              }
                            </MDBCardText>
                            <MDBCardText className="small text-muted mb-0">
                              Active Products
                            </MDBCardText>
                          </div>
                          <div>
                            <MDBCardText className="mb-1 h5">
                              {
                                AllProductsFromDatabase.filter(
                                  (product) => product.userid === user._id
                                ).length
                              }
                            </MDBCardText>
                            <MDBCardText className="small text-muted mb-0">
                              Total Products
                            </MDBCardText>
                          </div>
                        </div>
                      </div>
                      <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                          <p className="lead fw-normal mb-1">About</p>
                          <div
                            className="p-4"
                            style={{ backgroundColor: "#F8F9FA" }}
                          >
                            <MDBCardText className="font-italic mb-1">
                              Mobile Number: (+994){user?.number}
                            </MDBCardText>
                            <MDBCardText className="font-italic mb-1">
                              Email: {user?.email}
                            </MDBCardText>
                          </div>
                        </div>
                        <div
                          style={{
                            transition: "1s",
                            margin: "20px 0",
                            width: "100%",
                          }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {/* <MDBBtn
                              outline
                              color="secondary"
                              style={{ height: "36px", overflow: "visible", width:"50%"}}
                              onClick={()=>{navigate("/profile-orders")}}
                              tabIndex="2"
                            >
                              Your Orders
                            </MDBBtn> */}
                        </div>
                        <MDBCardText className="lead fw-normal productAdding">
                          <button
                            className="addbutton"
                            onClick={handleAddClick}
                          >
                            Add your product
                          </button>
                          {adding ? (
                            <>
                              <Addproduct />
                            </>
                          ) : (
                            <></>
                          )}
                        </MDBCardText>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBCardText className="lead fw-normal mb-0">
                            Recent Products
                          </MDBCardText>
                          <MDBCardText className="mb-0">
                            <Link to={`/products/search/${user.fullname}`}>
                              Show all
                            </Link>
                          </MDBCardText>
                        </div>
                        <MDBRow className="g-2">
                          {AllProductsFromDatabase.filter(
                            (product) => product.userid === user._id
                          )
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            .slice(0, 4)
                            .map((product, index) => (
                              <MDBCol
                                key={index}
                                className="mb-2 RecentProduct d-flex justify-content-center align-items-center"
                                md="6"
                                onClick={() => {
                                  navigate(`/products/id/${product._id}`);
                                }}
                              >
                                <div className="RecentProduct-img">
                                  <MDBCardImage
                                    src={`${baseUrl}/products/${product.productimage}`}
                                    alt={`Product ${index}`}
                                    className="w-100 rounded-3"
                                  />
                                </div>
                                {/* <div className="product-name">{product.productname}</div> */}
                              </MDBCol>
                            ))}
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            <Footer />
          </>
        );
      }
    } else navigate("/login");
  } else {
    return <Loading />;
  }
};

export default ProfilePage;
