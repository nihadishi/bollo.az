import React from 'react'
import "./style.scss"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='Navbar'>
    <div className='GoToHomePage'><Link to={"/"}>Bollo</Link></div>
    <div className='GoToAllProducts'><Link to={"/"}>Products</Link></div>
    <div>
        <button>For Users</button>
        <div>
            <Link to={"login"}>Login in or out</Link>
            <Link to={"account"}>My Account</Link>
        </div>
    </div>
 </div>
  )
}

export default Navbar