import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [registerData, setregisterData] = useState({
    image: null,
    fullname: "",
    region: "",
    city: "",
    number: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", registerData.image);
    formData.append("fullname", registerData.fullname);
    formData.append("region", registerData.region);
    formData.append("city", registerData.city.toLowerCase());
    formData.append("number", registerData.number);
    formData.append("email", registerData.email.toLowerCase());
    formData.append("password", registerData.password);
    try {
      const { data } = await axios.post("user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type for file upload
        },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setregisterData({
          image: null,
          fullname: "",
          region: "",
          city: "",
          number: "",
          email: "",
          password: "",
        });
        toast.success("Login successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error); //
    }
  };
    const [dragging, setDragging] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    const [imageURL, setImageURL] = useState('');
  
    const handleDragOver = (e) => {
      e.preventDefault();
      setDragging(true);
    };
    const handleDragLeave = () => {
      setDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
  
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageURL(reader.result);
        setHasImage(true);
      };
    };
    const handleFileChange = (e) => {     
      setregisterData({
        ...registerData,
        image: e.target.files[0],
      });
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageURL(reader.result);
        setHasImage(true);
      };
    };
  
    const handleClick = () => {
      document.getElementById('mediaFile').click();
    };
  

  return (
    <div className="Signup">
      <div className="d-flex justify-content-center align-items-center vh-100 opacity-80 Signup-in">
        <div className="bg-white p-3 rounded Signup-in-in " >
          <form onSubmit={registerUser} encType="multipart/form-data">
              <div
                id="profile"
                className={`profile-image ${dragging ? "dragging" : ""} ${
                  hasImage ? "hasImage" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                style={{ backgroundImage: hasImage ? `url(${imageURL})` : "" }}
              >
                <div class="dashes"></div>
                <label>{hasImage?"":"Upload your profile photo"}</label>
              </div>
              <input
                accept="image/*"
                type="file"
                name="image"
                id="mediaFile"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                required
              />
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Full Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="form-control rounded"
                name="fullname"
                value={registerData.fullname}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    fullname: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Region</strong>
              </label>
              <select
                name="region"
                className="form-control rounded"
                defaultChecked="0"
                onChange={(e) => {
                  setregisterData({ ...registerData, region: e.target.value });
                }}
                defaultValue={4}
              >
                <option className="form-control rounded" value="">
                  --Choose Your Region--
                </option>
                <option className="form-control rounded" value="Abşeron-Xızı">
                  Abşeron-Xızı
                </option>
                <option className="form-control rounded" value="Bakı">
                  Bakı
                </option>
                <option className="form-control rounded" value="Dağlıq Şirvan">
                  Dağlıq Şirvan
                </option>
                <option className="form-control rounded" value="Gəncə-Daşkəsən">
                  Gəncə-Daşkəsən
                </option>
                <option
                  className="form-control rounded"
                  value="Lənkəran-Astara"
                >
                  Lənkəran-Astara
                </option>
                <option className="form-control rounded" value="Mərkəzi Aran">
                  Mərkəzi Aran
                </option>
                <option className="form-control rounded" value="Mil Muğan">
                  Mil Muğan
                </option>
                <option className="form-control rounded" value="Naxçıvan">
                  Naxçıvan
                </option>
                <option className="form-control rounded" value="Qarabağ">
                  Qarabağ
                </option>
                <option className="form-control rounded" value="Qazax-Tovuz">
                  Qazax-Tovuz
                </option>
                <option className="form-control rounded" value="Quba-Xaçmaz">
                  Quba-Xaçmaz
                </option>
                <option className="form-control rounded" value="Şəki-Zaqatala">
                  Şəki-Zaqatala
                </option>
                <option className="form-control rounded" value="Şərqi Zəngəzur">
                  Şərqi Zəngəzur
                </option>
                <option className="form-control rounded" value="Şirvan-Salyan">
                  Şirvan-Salyan
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="city">
                <strong>City</strong>
              </label>
              <input
                type="text"
                placeholder="Enter your current city"
                className="form-control rounded"
                name="city"
                value={registerData.city}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    city: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase(),
                  });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                <strong>Phone Number(xx-xxx-xx-xx)</strong>
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  +994
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  pattern="[0-9]{9}"
                  value={registerData.number}
                  onChange={(e) => {
                    setregisterData({
                      ...registerData,
                      number: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded"
                name="email"
                value={registerData.email}
                onChange={(e) => {
                  setregisterData({ ...registerData, email: e.target.value.toLowerCase() });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded"
                name="password"
                value={registerData.password}
                onChange={(e) => {
                  setregisterData({
                    ...registerData,
                    password: e.target.value,
                  });
                }}
                required
              />
            </div>
            <button className="btn btn-success w-100">
              <strong>Create Account</strong>
            </button>
            <p>You are agree to our policies and terms</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
