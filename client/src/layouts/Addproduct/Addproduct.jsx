import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { UserContext } from '../../assets/context/userContext';
import { useNavigate } from 'react-router-dom';

const MultiStepForm = () => {
  const { user, setUser,loading,setLoading } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400)});
  const handleNext = () => {
    setStep(step + 1);
    setIsFormOpen(true);

  };

  const handleBack = () => {
    setStep(step - 1);
    setIsFormOpen(true);
  };
  const handleCancel = () =>{
    setIsFormOpen(false);
    navigate('/profile')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada verileri kullanabilirsiniz veya bir API'ye gönderebilirsiniz
    console.log('Submitted Data:', { photo, name, description });
  };
  return (<>
  {
    isFormOpen ? (<><div className="Addproduct">
    <div className="multi-step-form">
     <h1>New product form</h1>
     <form onSubmit={handleSubmit}>
       {step === 1 && (
         <div className="step">
           <h2>Step 1: Add Product</h2>
           <label>Product Photo</label>
           <input
             type="file"
             accept="image/*"
             onChange={(e) => setPhoto(e.target.files[0])}
           />
            <label>Product Name</label>
           <input
             type="text"
             placeholder="Name"
             value={name}
             onChange={(e) => setName(e.target.value)}
             required
           />
           <label>Product Description</label>
           <textarea
             placeholder="Description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             required
           />
         </div>
       )}
       {step === 2 && (
         <div className="step">
           <h2>Step 2: Check your detail</h2>
          
           <label>Seller</label>
           <input type="text" value={user.fullname} readOnly required />
           <label>Region</label>
           <input type="text" value={user.region} readOnly required />
           <label>City</label>
           <input type="text" value={user.city} readOnly required />
           <label>Email</label>
           <input type="text" value={user.email} readOnly required />
           <label>Number</label>
           <input type="text" value={`+994${user.number}`} readOnly required />
         </div>
       )}
       {step === 3 && (
         <div className="step">
           <h2>Step 3: Review and Submit</h2>
           <p>Photo: {photo.name}</p>
           <p>Name: {name}</p>
           <p>Description: {description}</p>
           <p>Seller: {user.fullname}</p>
           <p>Region: {user.region}</p>
           <p>City: {user.city}</p>
           <p>Email: {user.email}</p>
           <p>Number: {`+994${user.number}`}</p>
         </div>
       )}
       <div className="buttons">
           {step === 1 && <button onClick={handleCancel}>Cancel</button>}
         {step > 1 && <button onClick={handleBack}>Back</button>}
         {step < 3 && <button onClick={handleNext}>Next</button>}
         {step === 3 && <button type="submit">Submit</button>}
       </div>
     </form>
   </div>
  </div></>):(<></>)
  }
  </>
  );
};

export default MultiStepForm;
