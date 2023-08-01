import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';

const Redirect = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const handleClick=()=>{
        navigate("/login",{state:location.pathname});
    }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
        <h3 className='text-center'>You are not logged in.<br/>  please Login</h3>
        <div>
        {/* <Link to="/login"><button  className="btn btn-primary ">
            Login
          </button></Link>
         */}
        <button onClick={handleClick}  className="btn btn-primary ">
            Login
          </button>
    </div>
</div>
    </>
  );
}

export default Redirect;