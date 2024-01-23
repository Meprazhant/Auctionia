import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {  AiFillDelete } from 'react-icons/ai'

function Register() {

  const [image, setImage] = useState('')

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
    <div className="hero-content flex-col  sm:w-8/12 w-full">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">
            Already have an account? <Link to="/login" className="underline">Login here</Link>
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="name" placeholder="name" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="number" placeholder="phone" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input type="text" placeholder="address" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
           {(!image) && <input type="file" placeholder="image" onChange={(e)=>{
              setImage(URL.createObjectURL(e.target.files[0]))
            }} accept= "image/*" className="input input-bordered" required />}
          </div>

         {(image) && <div className="flex relative h-32 w-32 p-2 border-2 border-[#0000002a]">
            <img onDoubleClick={() =>{}} src={image} className='h-full w-full object-contain rounded-md' alt="Image" />
            <div onClick={()=>{
              setImage('')
            }} className="flex justify-center items-center absolute top-1 right-1 p-2 hover:bg-red-50 cursor-pointer rounded-full  bg-red-100">
              <AiFillDelete className="text-red-500" />
            </div>
          </div>}




          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>


  )
}

export default Register