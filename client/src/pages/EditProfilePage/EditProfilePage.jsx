import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { MDBBtn, MDBCardText, MDBInputGroup } from "mdb-react-ui-kit";
import { UserContext } from "../../assets/context/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../layouts/Loading/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { EditingIsOpen } from "../../assets/context/editinIsOpenContext";
const EditProfilePage = () => {
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const {editing,setEditing} = useContext(EditingIsOpen)
  const [editedUser, setEditedUser] = useState({
    fullname: user?.fullname || "",
    region: user?.region || "",
    city: user?.city || "",
    email: user?.email || "",
    number: user?.number || "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) clearInterval(timeout);
      setLoading(false);
    }, 1000);
  });

  const handleEditSave = async () => {
    const userID = user?.id;
    try {
      await axios.put(`user/profile/${userID}`, editedUser);
      setEditing(false);
      toast.success("You edited profile successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setEditing(false);
      toast.error("Please check your connection and try again");
    }
  };
  if (!loading) {
    if (user && editing) {
      return (
        <>
          <div className="editing">
            <div className="editing-inputs">
              <input className="editinput" type="file" id="" />
              <input
                className=" editinput"
                type="text"
                placeholder="fullname"
                value={editedUser.fullname}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    fullname: e.target.value,
                  })
                }
              />
              <input
                className=" editinput"
                type="text"
                value={editedUser.city}
                placeholder="city"
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    city: e.target.value,
                  })
                }
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                className="editinput"
                placeholder="Enter phone number"
                pattern="[0-9]{9}"
                value={editedUser.number}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    number: e.target.value,
                  })
                }
              />
              <div className="editinput-b">
              <MDBBtn
                outline
                className="editinput-b-button"
                color="danger"
                style={{ height: "36px", overflow: "visible" }}
                onClick={()=>{
                     setEditing(false)
                    //  navigate('/profile'),
                }}
              >
                Cancel
              </MDBBtn>
              <MDBBtn
                outline
                className="editinput-b-button"
                color="primary"
                style={{ height: "36px", overflow: "visible" }}
                onClick={handleEditSave}
              >
                Save
              </MDBBtn>
              </div>
            </div>
          </div>
        </>
      );
    } else navigate("/profile");
  } else return <Loading />;
};

export default EditProfilePage;
