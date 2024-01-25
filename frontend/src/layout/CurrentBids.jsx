import React, { useEffect } from 'react'
import BidCards from './BidCards'
import { useUser } from '../UserContext';

function CurrentBids({bids}) {
  const {user} = useUser();
  if(!bids) return null
  return (
    <div className='flex flex-col gap-2 p-5'>
        <div className="flex">
            <h2 className="text-xl font-bold">
                {bids?.length} total Auctions found
            </h2>
        </div>
        {/* auctions */}
        <div className="flex flex-wrap gap-8 mt-10 justify-center xl:justify-normal">
           {bids.map((bid) => (
            <BidCards user={user} key={bid._id} bid={bid}/>
           ))
            }
        </div>
    </div>
  )
}

export default CurrentBids