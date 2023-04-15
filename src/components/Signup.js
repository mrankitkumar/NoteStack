
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {


    const [credentials,setCredentials]=useState({name:"",email: "",password:"",cpassword:""});
    let navigate=useNavigate();
    const host = "http://localhost:3001";
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //"auth-tocken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNDc3ODEwZWI2ZmU1OWM0ODQwNzRmIn0sImlhdCI6MTY3ODAxNDM5OX0._clJ7FNxlX8WRarTEk2okF4DWrzk8xPyTdJ-pqeeehQ"
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

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
            props.showAlert("Account created Successfully ","success");
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
        <div className='container' style={{width:'500px',height:'500px',backgroundColor:'lightblue',padding:'10px',borderRadius: '30px'}}>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name"  aria-describedby="nameHelp" value={credentials.name} onChange={onchange}/>
                   
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="Password" value={credentials.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Conform Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onchange} />
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
