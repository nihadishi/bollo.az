import React from 'react';
import { Link } from 'react-router-dom';
const LoginPage = () => {
    return (
        <>
         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
          <div className="bg-white p-3 rounded w-25">
            <form action="">
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' className='form-control rounded' />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' className='form-control rounded' />
              </div>
              <button className='btn btn-success w-100'><strong>Log in</strong></button>
              <p>Do you haven't account?</p>
              <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create account</Link>
            </form>
          </div>
         </div>
        </>
      );
}

export default LoginPage