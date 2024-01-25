import React from 'react'
import { useNavigate } from 'react-router-dom'

function BidCards({bid, user}) {
  const router = useNavigate()

  function handleBid(){
    if(!user) return (
      localStorage.setItem('redirect', '/b/'+bid._id),
      router('/login')
    )
    router('/b/'+bid._id)
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure><img className='h-96 w-full object-cover' src={bid.image} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {bid.name}
      </h2>
      <p>
        {(bid.description).substring(0, 50)} ...
      </p>
      <div className="flex gap-2 flex-wrap flex-col">
        <div className="badge badge-outline">Price: {bid.price}</div>
        <div className="badge badge-outline">Bid Price: {bid.bidPrice}</div>
        <div className="badge badge-primary">Total Bids: {bid?.totalBids.length}</div>

      </div>
      <div className="card-actions justify-end">
      {/* check login */}
      {user && user._id === bid.userID ? (
        <div className="flex gap-2"><button className="btn btn-primary" onClick={()=>{
          router('/edit/'+bid._id)
        }}>Edit</button>
        <button className="btn btn-primary" onClick={handleBid}>View</button>
        
        </div>
      ) : (
        <button className="btn btn-primary" onClick={handleBid}>Bid</button>
      )}
      </div>
    </div>
  </div>

  )
}

export default BidCards