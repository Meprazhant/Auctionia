import React, { useEffect } from 'react'
import BidCards from './BidCards'

function CurrentBids() {
const [bids, setBids] = React.useState([])
  function getBids(){
    fetch('http://localhost:5500/api/bids/')
    .then(response => response.json())  
    .then(data => {
      console.log(data)
      setBids(data)
    });
  }

  useEffect(() => {
    getBids()
  }
  , [])

  return (
    <div className='flex flex-col gap-2 p-5'>
        <div className="flex">
            <h2 className="text-xl font-bold">
                24 total Auctions found
            </h2>
        </div>
        {/* auctions */}
        <div className="flex flex-wrap gap-8 mt-10 justify-center xl:justify-normal">
           {bids.map((bid) => (
            <BidCards key={bid._id} bid={bid}/>
           ))
            }
        </div>
    </div>
  )
}

export default CurrentBids