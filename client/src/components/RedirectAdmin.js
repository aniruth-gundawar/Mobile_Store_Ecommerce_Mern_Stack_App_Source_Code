import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectAdmin = () => {
    const navigate=useNavigate();
    useEffect(()=>
    {
        navigate("/");
    },[]);
  return (
    <></>
  );
}

export default RedirectAdmin;