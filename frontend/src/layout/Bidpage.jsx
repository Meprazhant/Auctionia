import React from 'react'
import BidSearch from './BideSearch'
import CurrentBids from './CurrentBids'

function Bidpage({type}) {
  return (
   <div className="flex flex-col">
   <div className="flex h-96 w-full" style={{
        backgroundImage: `url("https://th.bing.com/th/id/R.0df1132821a95e1ca406da4861ebce8d?rik=tLLGfpmOOPUQyg&pid=ImgRaw&r=0")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
   }}>
        <BidSearch/>
   </div>
   <CurrentBids/>
   </div>
  )
}

export default Bidpage