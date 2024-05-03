import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });
    const navigate= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          //Save the Auth Token and redirect
          localStorage.setItem('token',json.authtoken);
          navigate("/");  
          props.showAlert("Account Created Successfully", "success") 
        }
        else{
          props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

  return (
    <div className='contanier mt-5'>
 
        <h2 className='my-3'>Create an account to use iNotebook</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="exampleDropdownFormEmail2">Name</label>
        <input type="text" className="form-control" id="name"  name="name" placeholder="Name" onChange={onChange}/>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleDropdownFormEmail2">Email address</label>
        <input type="email" className="form-control" id="email"  name="email"placeholder="email@example.com" onChange={onChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} minLength={5} required/>
      </div>
      <div className="form-group">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password"onChange={onChange} minLength={5} required />
      </div><br/>
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
    </div>
  )
}

export default Signup