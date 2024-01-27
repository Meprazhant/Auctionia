import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../UserContext";

function Bidpage() {
  // get id params
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const router = useNavigate();
  const [bidPrice, setBidPrice] = React.useState(0);
  const { user } = useUser();
  const [bid, setBid] = React.useState({});
  const [notApproved, setNotApproved] = React.useState(false);
  function fetchBid() {
    fetch("http://localhost:5500/api/bids/" + id)
      .then((response) => response.json())
      .then((data) => {
        // check if bid was approved
        if (data.approved === false) {
          if (data.userID?._id !== user?._id) {
            alert("Bid not approved yet");
            router("/");
          } else {
            setNotApproved(true);
            setLoading(false);
            setBid(data);
          }
        } else {
          console.log(data);
          setLoading(false);
          setBid(data);
        }
      });
  }

  useEffect(() => {
    fetchBid();
  }, []);

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth();
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";

    const stndrdth = () => {
      if (day === 1 || day === 21 || day === 31) {
        return "st";
      } else if (day === 2 || day === 22) {
        return "nd";
      } else if (day === 3 || day === 23) {
        return "rd";
      } else {
        return "th";
      }
    };

    return `${day}${stndrdth()} ${
      monthArray[month]
    } ${year} at ${hour}:${min} ${ampm}`;
  }

  function getIncrement() {
    const bidPrice = bid?.bidPrice;
    let newPrice = (10 / 100) * bidPrice;
    return newPrice;
  }

  function bidNow() {
    // check if user is logged in
    if (!user)
      return (
        localStorage.setItem("redirect", "/b/" + bid._id), router("/login")
      );
    // check if bidPrice is greater than current bidPrice
    if (bidPrice <= bid?.bidPrice)
      return alert("Bid price must be greater than current bid price");
    // check if bidPrice is greater than original price
    if (bidPrice <= bid?.price)
      return alert("Bid price must be greater than original price");

    // check if user has already bidded

    // post bid
    const res = {
      bidPrice: bidPrice,
      user: user._id,
    };
    console.log(res);
    fetch("http://localhost:5500/api/makebid/" + bid._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchBid();
      });
  }
  const [alreadyBid, setAlreadyBid] = React.useState("");

  function checkifAlreadyBidded() {
    if (!user) return;
    if (!bid?.totalBids) return;
    const userBids = bid?.totalBids.filter(
      (bid) => bid.user[0]._id === user._id
    );
    if (userBids.length > 0) {
      setAlreadyBid(userBids[0]);
      setEditBid(false);
    } else {
      setAlreadyBid("");
      setEditBid(true);
    }
  }

  function deleteBid() {
    fetch("http://localhost:5500/api/bids/" + bid._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Bid Deleted");
        router("/");
      });
  }

  useEffect(() => {
    checkifAlreadyBidded();
  }, [bid]);

  const [editBid, setEditBid] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <div
            className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200
                h-32 w-32"
          ></div>
        </div>
      ) : (
        <div className="relative hero min-h-screen bg-base-200">
          <div className="hero-content h-full flex-col lg:flex-row">
            <div className="flex justify-center items-center md:w-1/3 w-full">
              {notApproved && (
                <div className="absolute top-0 left-0 flex p-3 bg-red-800 text-white w-full rounded-md">
                  The Auction is not approved yet. Please wait for the admin to
                  approve the auction so that other user can see.
                </div>
              )}
              <img
                src={bid?.image}
                className="h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="h-full md:w-2/3 w-full flex justify-start flex-col items-start p-5">
              <h1 className="text-5xl font-bold">{bid?.name}</h1>
              <p className="py-6">{bid?.description}</p>

              <div className="flex flex-col pb-10 gap-5">
                <div className="hover:bg-[#ffffff1a] cursor-pointer flex p-2 gap-3 bg-[#ffffff3a] rounded-full">
                  <img
                    className="h-6  w-6 rounded-full object-cover"
                    src={`http://localhost:5500/upload/` + bid.userID?.file}
                    alt=""
                  />
                  <h2>{bid?.userID?.name}</h2>
                </div>

                {!!alreadyBid && !editBid && (
                  <div className=" cursor-pointer flex p-2 gap-3 bg-[#ff3b3b3a]">
                    <div className="flex flex-col items-start gap-3">
                      You have already bidded NPR. {alreadyBid?.bidPrice} on{" "}
                      {formatDate(alreadyBid?.time)}
                      <button
                        className="btn btn-primary ml-2"
                        onClick={() => setEditBid(true)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}

                {user && user._id === bid.userID?._id ? (
                  <div className="flex gap-3">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => {
                        router("/edit/" + bid._id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-warning ml-2"
                      onClick={deleteBid}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <>
                    {editBid && (
                      <div className="flex gap-5">
                        <select
                          className="rounded-md"
                          onChange={(e) => {
                            setBidPrice(e.target.value);
                          }}
                        >
                          <option value={bid?.bidPrice}>
                            NPR. {bid?.bidPrice}
                          </option>
                          {/* map 10 values with multiplying */}
                          {Array(10)
                            .fill()
                            .map((_, i) => (
                              <option
                                value={bid?.bidPrice + getIncrement() * (i + 1)}
                              >
                                NPR. {bid?.bidPrice + getIncrement() * (i + 1)}
                              </option>
                            ))}
                        </select>
                        <button className="btn btn-primary" onClick={bidNow}>
                          Bid Now
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="overflow-x-auto">
                <h2 className="text-2xl font-bold">Product Detail</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Posted On</th>
                      <th>{formatDate(bid?.createdAt)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Original Price</td>
                      <td>NPR. {bid?.price}</td>
                    </tr>
                    <tr>
                      <td>Current Bid Price</td>
                      <td>NPR. {bid?.bidPrice}</td>
                    </tr>
                    <tr>
                      <td>Total Bids</td>
                      <td>{bid?.totalBids?.length}</td>
                    </tr>
                    <tr>
                      <td>Total Views</td>
                      <td>{bid?.views}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{bid?.category}</td>
                    </tr>
                  </tbody>
                </table>

                {bid?.totalBids?.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold mt-2">Bid History</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Bid Price</th>
                          <th>Bid Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bid?.totalBids.map((bid) => (
                          <tr>
                            <td>{bid?.user[0]?.name}</td>
                            <td>{bid?.bidPrice}</td>
                            <td>{formatDate(bid?.time)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bidpage;
