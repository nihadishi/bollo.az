import React, { useEffect } from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import icon from "./icons8-fire-exit-64.png";
const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.onmousemove = (e) => {
      let img = document.createElement("img");
      img.src = icon ;
      img.style.position = "absolute";
      img.style.left = e.pageX + "px";
      img.style.top = e.pageY + "px";
      img.animate([{ opacity: 0 }], { duration: 400 }).onfinish = () => 
        img.remove();
        document.body.append(img);
      
    };

    // Temizlik için kullanılabilir:
    return () => {
      document.onmousemove = null;
    }
  }, []); // Boş bağımlılık dizisi ile, yalnızca ilk yüklemede çalışır

  return (
    <div className='d-flex justify-content-center align-items-center vw-100 vh-100 errorpage' onClick={() => { navigate("/products") }}>Not Found</div>
  );
}

export default ErrorPage;
