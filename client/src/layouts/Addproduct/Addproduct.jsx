import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { UserContext } from "../../assets/context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 3);
  const todayString = today.toISOString().split("T")[0];
  const maxDateString = maxDate.toISOString().split("T")[0];
  const [addproductdata, setaddproductData] = useState({
    productimage: null,
    productname: "",
    productdescription: "",
    productprice: "",
    productunit: "",
    productcategory: "",
    producttype: "",
    productexpirationdate: { todayString },
    fullname: user.fullname,
    region: user.region,
    city: user.city,
    number: user.number,
    email: user.email,
    id: user._id,
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400);
  });
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleCancel = () => {
    setIsFormOpen(false);
  };

  const [hasImage, setHasImage] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const handleFileChange = (e) => {
    setaddproductData({
      ...addproductdata,
      productimage: e.target.files[0],
    });
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImageURL(reader.result);
      setHasImage(true);
    };
  };
  const addProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("productimage", addproductdata.productimage);
    formData.append("productname", addproductdata.productname);
    formData.append("productdescription", addproductdata.productdescription);
    formData.append("productprice", addproductdata.productprice);
    formData.append("productunit", addproductdata.productunit);
    formData.append("productcategory", addproductdata.productcategory);
    formData.append("producttype", addproductdata.producttype);
    formData.append(
      "productexpirationdate",
      addproductdata.productexpirationdate
    );
    formData.append("fullname", addproductdata.fullname);
    formData.append("region", addproductdata.region);
    formData.append("city", addproductdata.city);
    formData.append("number", addproductdata.number);
    formData.append("email", addproductdata.email);
    formData.append("userid", addproductdata.id);
    try {
      const { data } = await axios.post("products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type for file upload
        },
      });
      console.log("data", data);
      if (data.error) {
        toast.error("Can't add the product, please try again ");
      } else {
        setaddproductData({
          productimage: null,
          productname: "",
          productdescription: "",
          productprice: "",
          productunit: "",
          productcategory: "",
          producttype: "",
          productexpirationdate: "",
          fullname: user.fullname,
          region: user.region,
          city: user.city,
          number: user.number,
          email: user.email,
          id: user._id,
        });
        toast.success("Product added");
        navigate("/products");
      }
    } catch (error) {
      toast.error(error.message);
      toast.error(error.name);
      console.log(error);
    }
  };
  return (
    <>
      {isFormOpen ? (
        <>
          <div className="Addproduct">
            <div className="multi-step-form">
              <h1>New product form</h1>
              <form encType="multipart/form-data" onSubmit={addProduct}>
                {step === 1 && (
                  <div className="step">
                    <h2>Step 1: Add Product Details</h2>

                    <label>Product Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="Addproduct--file"
                      onChange={handleFileChange}
                    />

                    <label>Product Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="Addproduct--text"
                      value={addproductdata.productname}
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productname: e.target.value,
                        })
                      }
                      required
                    />
                    <label>Product Description</label>
                    <textarea
                      placeholder="Description"
                      className="Addproduct--text"
                      value={addproductdata.productdescription}
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productdescription: e.target.value,
                        })
                      }
                      required
                    />

                    <label>Product Price</label>
                    <input
                      type="number"
                      placeholder="Price (AZN)"
                      value={addproductdata.productprice}
                      className="Addproduct--number"
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productprice: e.target.value,
                        })
                      }
                      required
                    />
                    <select
                      className="selectinput"
                      name="productunit"
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productunit: e.target.value,
                        })
                      }
                    >
                      <option value="">--CHOOSE--</option>
                      <option value="AZN/kg">AZN/kg</option>
                      <option value="AZN/gr">AZN/gr</option>
                      <option value="AZN/ton">AZN/ton</option>
                      <option value="AZN/l">AZN/l</option>
                      <option value="AZN/ml">AZN/ml</option>
                      <option value="AZN/piece">AZN/piece</option>
                    </select>

                    <label>Product Category</label>
                    <select
                      name="productcategory"
                      className="selectinput"
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productcategory: e.target.value,
                        })
                      }
                    >
                      <option value="">--CHOOSE--</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Pastry">Pastry</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Eggs">Eggs</option>
                      <option value="Delikatessen">Delikatessen</option>
                      <option value="Savoury Grocery">Savoury Grocery</option>
                      <option value="Meat">Meat</option>
                      <option value="Poultry">Poultry</option>
                    </select>
                    <select
                      name="producttype"
                      className="selectinput"
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          producttype: e.target.value,
                        })
                      }
                    >
                      <option value="">--CHOOSE--</option>
                      <option value="Fresh">Fresh</option>
                      <option value="Greenhouse">Greenhouse</option>
                      <option value="Other">Other</option>
                    </select>

                    <label for="expirationdate" class="form-label">
                      Expiration date:
                    </label>
                    <input
                      type="date"
                      id="expirationdate"
                      name="expirationdate"
                      class="form-control"
                      value={addproductdata.productexpirationdate}
                      onChange={(e) =>
                        setaddproductData({
                          ...addproductdata,
                          productexpirationdate: e.target.value,
                        })
                      }
                      min={todayString}
                      max={maxDateString}
                    />
                  </div>
                )}
                {step === 2 && (
                  <div className="step">
                    <h2>Step 2: Check your detail</h2>

                    <label>Seller</label>
                    <input
                      type="text"
                      className="Addproduct--text"
                      value={user.fullname}
                      readOnly
                      required
                    />
                    <label>Region</label>
                    <input
                      type="text"
                      value={user.region}
                      className="Addproduct--text"
                      readOnly
                      required
                    />
                    <label>City</label>
                    <input
                      type="text"
                      value={user.city}
                      className="Addproduct--text"
                      readOnly
                      required
                    />
                    <label>Email</label>
                    <input
                      type="text"
                      value={user.email}
                      className="Addproduct--text"
                      readOnly
                      required
                    />
                    <label>Number</label>
                    <input
                      type="text"
                      className="Addproduct--text"
                      value={`+994${user.number}`}
                      readOnly
                      required
                    />
                  </div>
                )}
                {step === 3 && (
                  <div className="step">
                    <h2>Step 3: Review and Submit</h2>
                    <div>Photo: {addproductdata?.productimage?.name}</div>
                    <div>Name: {addproductdata?.productname}</div>
                    <div>Description: {addproductdata?.productdescription}</div>
                    <div>Seller: {addproductdata?.fullname}</div>
                    <div>Region: {addproductdata?.region}</div>
                    <div>City: {addproductdata?.city}</div>
                    <div>Email: {addproductdata?.email}</div>
                    <div>Number: {`+994${addproductdata?.number}`}</div>
                  </div>
                )}
                <div className="buttons">
                  {step === 1 && (
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  )}
                  {step > 1 && (
                    <button type="button" onClick={handleBack}>
                      Back
                    </button>
                  )}
                  {step < 3 && (
                    <button type="button" onClick={handleNext}>
                      Next
                    </button>
                  )}
                  {step === 3 && <button type="submit">Submit</button>}
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MultiStepForm;
