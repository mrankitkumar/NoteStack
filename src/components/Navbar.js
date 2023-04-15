import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let navigate=useNavigate();
    useEffect(() => {
        // Google Analytics
        console.log(location);
        
      }, [location]);
      const handlelogout=()=>
      {
        localStorage.removeItem('token');
        navigate("/Login");


      }

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid" >
    <Link className="navbar-brand" to="#" style={{color:'orange'}}>Notestack</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=="/"? "active":" "}`} aria-current="page" to="/" style={{color:'orange'}}>Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className={`nav-link ${location.pathname=="/about" ?"active":" "}`} to="/about">About</Link>
        </li> */}
      </ul>

            {/* <form class="form-inline my-2 my-lg-0" >
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
        
          {!localStorage.getItem('token')?<form className="d-flex">
             <Link className="btn btn-primary mx-2" role="button" to="/login" >Login</Link>
             <Link className="btn btn-danger mx-2" role="button" to="/signup" >Signup</Link>
           </form>:<button onClick={handlelogout} className="btn btn-primary">Logout</button>}
    </div>
    
  </div>
</nav>
    </>
  )
}

export default Navbar
