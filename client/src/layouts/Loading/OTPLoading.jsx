import React from 'react'
import processingloading from "../../pages/OTPPage/img/procesaing.gif"
const OTPLoading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
      <img src={processingloading} />
    </div>
  )
}

export default OTPLoading