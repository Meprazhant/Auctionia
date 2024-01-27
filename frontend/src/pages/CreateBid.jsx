import React, { useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function CreateBid() {
  const { user } = useUser();
  const router = useNavigate();

  const artCategories = [
    "Painting",
    "Photography",
    "Digital Art",
    "Sculpture",
    "Graphic Design",
    "Street Art",
    "Illustration",
    "Mixed Media",
  ];

  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    bidPrice: "",
    userID: user._id,
  });
  if (!user) {
    return (
      localStorage.setItem("redirect", "/create"),
      (window.location.href = "/login")
    );
  }

  function handleChange(name, value) {
    setData({ ...data, [name]: value });
  }

  function submit() {
    if (
      !!data.name &&
      !!data.description &&
      !!data.image &&
      !!data.price &&
      !!data.bidPrice &&
      !!data.category
    ) {
      fetch("http://localhost:5500/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            window.location.href = "/";
          } else {
            alert("Successfully created auction");
            router("/b/" + res._id);
          }
        });
    } else {
      alert("Please fill all the fields");
    }
  }
  return (
    <div
      className="hero min-h-screen bg-base-200 p-10"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div
        className="hero-content text-center bg-[#000000b7] rounded-md"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold">Create Your Auction</h1>
          <p className="mb-5">
            Please fill the below form to create your auction.
          </p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product's name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter your description"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="textarea h-24 textarea-bordered"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              name="image"
              type="text"
              placeholder="Enter your image URL"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="input input-bordered"
            />
          </div>
          {!!data.image && (
            <div className="flex">
              <img src={data.image} className="h-30 object-contain" alt="" />
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter your original product price"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bidding Price</span>
            </label>
            <input
              name="bidPrice"
              type="number"
              placeholder="Enter your starting bidding Price"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bidding Price</span>
            </label>
            <select
              name="category"
              type="number"
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              className="input input-bordered"
            >
              <option value="">Select Category</option>
              {artCategories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary mt-5" onClick={submit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBid;
