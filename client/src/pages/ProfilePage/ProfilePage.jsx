import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import React from "react";
import { UserContext } from "../../assets/context/userContext";
import axios from "axios";
import "./style.scss";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter, } from 'mdb-react-ui-kit';

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.post("logout");
      setUser(null); 
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
   
  };
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);




  return (
    <div className="gradient-custom-2 profile">
      <MDBContainer className="py-5 h-100 w-100 ">
        <MDBRow className="justify-content-center align-items-center h-100 ">
          <MDBCol lg="9" xl="11">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#ffa217', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  
                </div>
                <div className="ms-3" style={{ marginTop: '90px'}}>
                  <MDBTypography tag="h2">{user?.fullname}</MDBTypography>
                  <MDBCardText tag="h4">{user?.region}</MDBCardText>
                </div>
                {/* logout */}
                <div  style={{ position: 'absolute', right: '0'}}>
                    <MDBBtn style={{height:'40px'}} onClick={toggleShow} color="danger">Log out</MDBBtn>
                    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>Are you sure?</MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow} style={{height:'40px'}}>
                              Cancel
                            </MDBBtn>
                            <MDBBtn style={{height:'40px'}} color="danger">Log out</MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                    </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-between align-items-center text-center py-1 margi">
                    <div style={{transition: '1s'}}>
                      <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                      </MDBBtn>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Rating</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Total Orders</MDBCardText>
                    </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Mobile Number: (+994){user?.number}</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Email: {user?.email}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent Products</MDBCardText>
                  <MDBCardText className="mb-0"><Link to='/products'>Show all</Link></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image " className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image " className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  // if (user) {
  //   return(
  //   <>
  //     {user.fullname?<h1>{user.fullname}</h1>:<h1>Fullname</h1>}
  //     {user.region?<h1>{user.region}</h1>:<h1>region</h1>}
  //     {user.email?<h1>{user.email}</h1>:<h1>email</h1>}
  //     {user.number?<h1>{user.number}</h1>:<h1>number</h1>}
  //     <button onClick={logoutUser}>Log Out</button>
  //   </>
  //   )
  // } 
  // else {
  //   return (
  //     <>
  //       <h1>You logged out</h1>
  //       <button
  //         onClick={() => {
  //           navigate("/login");
  //         }}
  //       >
  //         Log in
  //       </button>
  //     </>
  //   );
  // }
};

export default ProfilePage;
