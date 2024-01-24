import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useUser } from "../UserContext";

function Register() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState({
    images: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const {user} = useUser()

  if(user) {
    window.location.href = "/";
  }

  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }

  function uploadData() {
    if (
      !!data.name &&
      !!data.email &&
      !!data.password &&
      !!data.phone &&
      !!data.address
    ) {
      uploadImage();
    } else {
      alert("Please fill all the fields");
    }
  }

  async function uploadImage() {
    setLoading(true);
    if (image) {
      const formData = new FormData();
      const fileName = Date.now() + image.name;
      formData.append("name", fileName);
      formData.append("file", image);
      data.images = fileName;
      try {
        const resp = await axios.post(
          `http://localhost:5500/api/upload`,
          formData
        );
       fetch("http://localhost:5500/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if(res.status === 200) {
              setToast(true);
              setLoading(false);
              setTimeout(() => {
                setToast(false);
                window.location.href = "/login";
              }
              , 2000);
            }else{
              setToast(res.message);
              setTimeout(() => {
                setToast(false);
              }, 2000);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log("2",err);
            setLoading(false);
          });
      } catch (error) {
        console.log("1",error);
        setLoading(false);
      }
    } else {
      alert("Please upload an image");
      setLoading(false);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col  sm:w-8/12 w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              name="name"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              name="phone"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              placeholder="phone"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              placeholder="address"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            {!image && (
              <input
                type="file"
                placeholder="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                accept="image/*"
                className="input input-bordered"
                required
              />
            )}
          </div>

          {image && (
            <div className="flex relative h-32 w-32 p-2 border-2 border-[#0000002a]">
              <img
                onDoubleClick={() => {}}
                src={URL.createObjectURL(image)}
                className="h-full w-full object-contain rounded-md"
                alt="Image"
              />
              <div
                onClick={() => {
                  setImage("");
                }}
                className="flex justify-center items-center absolute top-1 right-1 p-2 hover:bg-red-50 cursor-pointer rounded-full  bg-red-100"
              >
                <AiFillDelete className="text-red-500" />
              </div>
            </div>
          )}
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={() => {
                uploadData();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex fixed top-0 left-0 justify-center items-center min-h-screen bg-[#0000000c] backdrop-blur-md w-full">
          <div className="flex flex-col justify-center items-center gap-2 bg-[#0000ff18] backdrop-blur-md rounded-xs p-4">
            <h2 className="text-2xl font-bold">Creating User</h2>
            <span className="loading loading-infinity loading-xl"></span>
            <p className="text-xl ">
              Please wait while we are creating your account
            </p>
          </div>
        </div>
      )}

     {(toast) && <div className="toast toast-end">
        <div className={`alert ${(toast == true) && 'alert-info' || 'alert-warning'}`}>
          {(toast == true ) && <span>Account Created Successfully. Taking you to login</span> 
          ||
          <span>{toast}</span>
          }
        </div>
      </div>}
    </div>
  );
}

export default Register;
