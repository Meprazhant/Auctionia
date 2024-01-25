import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '../UserContext';


function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {user, login} = useUser();

  useEffect(() => {
    if(user) {
      window.location.href = "/";
      if(localStorage.getItem('redirect')) {
        window.location.href = localStorage.getItem('redirect');
        localStorage.removeItem('redirect');
      }
    }
  }, [user])

  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }

  function validateUser(){
    if (
      !!data.email &&
      !!data.password
    ) {
      fetch("http://localhost:5500/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if(res.status === 201) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            login(res.user);
          } else {
            alert(res.message);
          }
        });
    } else {
      alert("Please fill all the fields");
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
    <div className="hero-content flex-col  sm:w-8/12 w-full">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
            Don't have an account? <Link to="/register" className="underline">Sign up here</Link>
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' onChange={(e)=>{
              handleChange('email', e.target.value)
            }} placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' onChange={(e)=>{
              handleChange('password', e.target.value)
            }} placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={validateUser}>Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login