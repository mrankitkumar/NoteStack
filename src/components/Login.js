import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [credentials,setCredentials]=useState({email: "",password:""});
    let navigate=useNavigate();
    //const host = "http://localhost:3001";
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //"auth-tocken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNDc3ODEwZWI2ZmU1OWM0ODQwNzRmIn0sImlhdCI6MTY3ODAxNDM5OX0._clJ7FNxlX8WRarTEk2okF4DWrzk8xPyTdJ-pqeeehQ"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})

        });
        const  json=await response.json();
        console.log(credentials.email);
        console.log("haaaaddd"+credentials);
        console.log(json);
        if(json.success=='true')
        {
            //redirect
            localStorage.setItem('token',json.authtoken);
            //use histrory hook
             navigate("/");
            props.showAlert("welcome to NoteStack","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onchange = (e) => {
        //... spresd operater
        //...notes=>those value in notes ka hai oo rahay but jo aagay properties liki ja rahi hai usko override kardena
        // e.target.name in the  on onchange the those value may likoo ga oo name kay barabar hoo jayaga
        // jo bhi name hai usko value kay barabar kar doo
        //jo value may input may likoo ga uska value joo lika hoo uskay barabar ho jaya ga
        console.log("connnnchh"+credentials);
        setCredentials({...credentials, [e.target.name]: e.target.value });
        
        
    
      }
    return (
        <>
        <div className='container' style={{width:'400px',height:'400px',backgroundColor:'lightblue',padding:'10px',borderRadius: '30px'}}>
            <form  onSubmit={handleSubmit} >
                <div className="mb-3 my-5">
                    <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 my-3">
                    <label htmlfor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login
