import React from 'react'


function BidCards({bid}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure><img src={bid.image} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {bid.name}
      </h2>
      <p>
        {bid.description}
      </p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Bid Now</button>
      </div>
    </div>
  </div>

  )
}

export default BidCards