import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function EditBid() {
  const { user } = useUser();
  const { id } = useParams();
  const router = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    bidPrice: "",
    userID: user._id,
    category: "",
  });

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

  // check if user is the owner of the bid
  // if not then redirect to home page

  function fetchBid() {
    fetch("http://localhost:5500/api/bids/" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.userID._id !== user._id) {
          router("/");
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        router("/");
      });
  }

  useEffect(() => {
    fetchBid();
  }, []);

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
      fetch("http://localhost:5500/api/bids/" + id, {
        method: "PUT",
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
            alert("Successfully Updated auction");
            router("/b/" + res._id);
          }
        });
    } else {
      alert("Please fill all the fields");
    }
  }

  if (!user) {
    return (
      localStorage.setItem("redirect", "/create"),
      (window.location.href = "/login")
    );
  }

  if (!id) return router("/");
  if (loading) return <div>Loading...</div>;
  return (
    <div
      className="hero min-h-screen justify-end bg-base-200 p-10"
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      <div
        className="hero-content text-center bg-[#000000b7] rounded-md"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold">Update Your Auction</h1>
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
              value={data.name}
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
              value={data.description}
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
              value={data.image}
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
              value={data.price}
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
              value={data.bidPrice}
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
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={data?.category}
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBid;
