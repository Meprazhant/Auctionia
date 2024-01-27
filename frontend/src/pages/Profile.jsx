import React, { useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const [auction, setAuction] = React.useState([]);
  const [bids, setBids] = React.useState([]);

  function getAuction() {
    fetch("http://localhost:5500/api/bids/u/" + user._id)
      .then((res) => res.json())
      .then((data) => {
        setAuction(data);
      });
  }

  function getBids() {
    fetch("http://localhost:5500/api/bids/b/" + user._id)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }

  useEffect(() => {
    getAuction();
    getBids();
  }, []);

  if (!user || !user.name) {
    navigate("/login");
    localStorage.setItem("redirect", "/profile");
    return null;
  }
  return (
    <div className="flex flex-col p-4 md:flex-row gap-2 w-full min-h-screen">
      <div className="flex md:w-6/12 w-full md:border-black border-none border-r-2">
        <div className="lg:fixed relative p-5">
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-20 w-20 rounded-full mx-auto object-cover mt-5"
                src={"http://localhost:5500/upload/" + user.file}
                alt="Profile"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{user.name}</h2>
              <p>
                {user.email} <br />
              </p>
              <p>
                {user.phone} <br />
              </p>
              <div className="badge badge-accent badge-outline">
                {user.type}
              </div>
              <div className="card-actions mt-5 justify-between">
                {user.type == "admin" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    Admin
                  </button>
                )}
                <button className="btn btn-primary" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-md border-2 border-[#0000002b] w-full">
        <div className="flex flex-col gap-3 p-5">
          <h2 className="text-xl font-bold">Your Posted Auctions</h2>
          <div className="flex flex-wrap gap-2">
            {auction.length > 0 ? (
              auction.map((auction) => (
                <div className="card shadow-xl w-96">
                  <figure>
                    <img
                      src={auction.image}
                      alt="Auction Image"
                      className="h-40 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{auction.name}</h2>
                    <p>{auction.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/b/" + auction._id);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card shadow-xl w-96">
                <div className="card-body">
                  <h2 className="card-title">No Auctions</h2>
                  <p>
                    You have not posted any auctions. Click on the button below
                    to post an auction.
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/create")}
                    >
                      Post Auction
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 mt-5 border-t-2 border-black">
          <h2 className="text-xl font-bold">Your Bidded Auctions</h2>
          <div className="flex flex-wrap gap-2">
            {bids.length > 0 ? (
              bids.map((bids) => (
                <div className="card shadow-xl w-96">
                  <figure>
                    <img
                      src={bids.image}
                      alt="bids Image"
                      className="h-40 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{bids.name}</h2>
                    <p>{bids.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/b/" + bids._id);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card shadow-xl w-96">
                <div className="card-body">
                  <h2 className="card-title">No bids</h2>
                  <p>
                    You have not Bidded on any auctions. Click on the button
                    below to explore the marketplace.
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/bids")}
                    >
                      Explore Market
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
