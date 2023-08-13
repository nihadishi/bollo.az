import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { UserContext } from "../../assets/context/userContext";
// import profileImageRoute from "../../../../server/images/profilephotos"
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
  MDBInputGroup,
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

const ProfilePage = () => {
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const profileImage = "http://localhost:5000/profilephotos/" + user?.image;
  const [editedUser, setEditedUser] = useState({
    fullname: user?.fullname || "asdfg",
    region: user?.region || "",
    city: user?.city || "",
    email: user?.email || "",
    number: user?.number || "",
  });
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
      setLoading(false);
    }, 400);
  });

  const handleEditClick = (e) => {
    setEditing(!editing);
  };
  const handleAddClick = (e) => {
    setAdding(!adding);
  };

  const handleEditSave = async () => {
    const userID = user?.id;
    try {
      await axios.put(`profile/${userID}`, editedUser);
      setEditing(false);
      toast.success("You edited profile successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setEditing(false);
      toast.error("Please check your connection and try again");
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShow = () => setBasicModal(!basicModal);
  console.log(user);
  if (!loading) {
    return (
      <>
        <div className="gradient-custom-2 profile">
          <MDBContainer className="py-5 h-100 w-100 ">
            <MDBRow className="justify-content-center align-items-center h-100 ">
              {/* edit your data */}
              <div className="d-flex justify-content-center align-items-center text-center py-1">
                {editing ? (
                  <>
                    <MDBCardText>

                    <MDBInputGroup>
                      <input
                        className="form-control"
                        type="file"
                        id="inputGroupFile02"
                      />
                    <input
                      type="text"
                      value={editedUser.fullname}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          fullname: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedUser.city}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, city: e.target.value })
                      }
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                      pattern="[0-9]{9}"
                      value={editedUser.number}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, number: e.target.value })
                      }
                    />
                    <MDBBtn
                      outline
                      color="danger"
                      style={{ height: "36px", overflow: "visible" }}
                      onClick={handleEditSave}
                    >
                      Save
                    </MDBBtn>
                    </MDBInputGroup>

                    </MDBCardText>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/*  */}
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
                        src={user?.image ? profileImage : defaultProfilePhoto}
                        alt="stdfyugihdfghjkhgfdghjkhgfdshjkn"
                        className="mt-4 mb-2 img-thumbnail"
                        // fluid
                        style={{ width: "150px", zIndex: "1" }}
                      />
                    </div>
                    <div className="ms-3" style={{ marginTop: "90px" }}>
                      <MDBTypography tag="h2">{user?.fullname}</MDBTypography>
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
                              <MDBModalTitle>Modal title</MDBModalTitle>
                              <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>Are you sure?</MDBModalBody>

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
                        <MDBCardText className="mb-1 h5">478</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">
                          Rating
                        </MDBCardText>
                      </div>
                      <div>
                        <MDBCardText className="mb-1 h5">478</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">
                          Total Orders
                        </MDBCardText>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className="text-black p-4">
                    <div className="mb-5">
                      <p className="lead fw-normal mb-1">About</p>
                      <div
                        className="p-4"
                        style={{ backgroundColor: "#f2f4f5" }}
                      >
                        <MDBCardText className="font-italic mb-1">
                          Mobile Number: (+994){user?.number}
                        </MDBCardText>
                        <MDBCardText className="font-italic mb-1">
                          Email: {user?.email}
                        </MDBCardText>
                      </div>
                    </div>
                    <MDBCardText className="lead fw-normal m-5">
                      <button className="addbutton" onClick={handleAddClick}>
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
                        <Link to="/products">Show all</Link>
                      </MDBCardText>
                    </div>
                    <MDBRow className="g-2">
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt="image "
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                          alt="image "
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="g-2">
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                          alt="image 1"
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
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
  } else {
    // return navigate("/login");
    return <Loading />;
  }
};

export default ProfilePage;
