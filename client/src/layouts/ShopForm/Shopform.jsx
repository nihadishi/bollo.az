import React, { useContext, useState } from 'react';
import "./style.scss";
import { ShoppingFormContext } from '../../assets/context/shopFormContext';
import xicon3 from "./img/xicon3.png"
import xicon4 from "./img/xicon4.png"
import backicon from "./img/backicon.png"
const ShopForm = ({setOpenShopForm}) => {
const{shopForm,setShopForm} = useContext(ShoppingFormContext);

  return (
    
    <div className="ShopForm">
        <div className="ShopForm-X" onClick={()=>{setOpenShopForm(false)}}><img src={backicon} width={"36px"} height={"36px"} alt='X'/></div>
      <form className="ShopForm-Form">
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={shopForm.Name}
            onChange={(e)=>setShopForm({...shopForm,Name: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="Surname">Surname:</label>
          <input
            type="text"
            id="Surname"
            name="Surname"
            value={shopForm.Surname}
            onChange={(e)=>setShopForm({...shopForm,Surname: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="IDCardNumber">ID Card Number:</label>
          <input
            type="text"
            id="IDCardNumber"
            name="IDCardNumber"
            value={shopForm.IDCardNumber}
            onChange={(e)=>setShopForm({...shopForm,IDCardNumber: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={shopForm.Email}
            onChange={(e)=>setShopForm({...shopForm,Email: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="Number">Phone Number:</label>
          <input
            type="text"
            id="Number"
            name="Number"
            value={shopForm.Number}
            onChange={(e)=>setShopForm({...shopForm,Number: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="Country">Country:</label>
          <select
            id="Country"
            name="Country"
            value={shopForm.Country}
            onChange={(e)=>setShopForm({...shopForm,Country: e.target.value})}
          >
            <option value="Azerbaijan">Azerbaijan</option>
            {/* Digər ölkə seçenəklərini burada əlavə edə bilərsiniz */}
          </select>
        </div>
        <div>
          <label htmlFor="City">City:</label>
          <input
            type="text"
            id="City"
            name="City"
            value={shopForm.City}
            onChange={(e)=>setShopForm({...shopForm,City: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="Street">Street:</label>
          <input
            type="text"
            id="Street"
            name="Street"
            value={shopForm.Street}
            onChange={(e)=>setShopForm({...shopForm,Street: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="ZipCode">Zip Code:</label>
          <input
            type="text"
            id="ZipCode"
            name="ZipCode"
            value={shopForm.ZipCode}
            onChange={(e)=>setShopForm({...shopForm,ZipCode: e.target.value})}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default ShopForm;
