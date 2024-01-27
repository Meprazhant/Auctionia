import React from "react";

function AdminCard({ auction, reload }) {
  function approveAuction() {
    fetch(`http://localhost:5500/api/bids/approve/${auction._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Auction approved successfully");
        reload();
      });
  }

  function deleteBid() {
    fetch(`http://localhost:5500/api/bids/${auction._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Bid deleted successfully");
        reload();
      });
  }

  function getDate(date) {
    // get like 5 minute ago, 2 days ago etc
    const currentDate = new Date();
    const auctionDate = new Date(date);
    const diff = currentDate - auctionDate;
    const minutes = diff / (1000 * 60);
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;

    if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;

    if (hours < 24) return `${Math.floor(hours)} hours ago`;

    if (days < 30) return `${Math.floor(days)} days ago`;

    if (months < 12) return `${Math.floor(months)} months ago`;

    return `${Math.floor(years)} years ago`;
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={auction.image} alt={auction.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {auction.name}
          <div className="badge badge-secondary">
            {getDate(auction.createdAt)}
          </div>
        </h2>
        <p>{auction?.description.slice(0, 100)}...</p>
        <h6 className="badge badge-primary">{auction.category}</h6>
        <div className="card-actions justify-start">
          <button className="btn btn-primary" onClick={approveAuction}>
            Approve
          </button>
          <button className="btn btn-ghost" onClick={deleteBid}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
