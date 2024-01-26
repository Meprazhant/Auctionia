import React, {useEffect} from 'react'
import BidSearch from './BideSearch'
import CurrentBids from './CurrentBids'

function Bidpage({}) {
            const [bids, setBids] = React.useState([])
     function getBids(){
          fetch('http://localhost:5500/api/bids/')
          .then(response => response.json())  
          .then(data => {
            setBids(data)
          });
        }
      
        useEffect(() => {
          getBids()
        }
        , [])
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
   <CurrentBids bids={bids}/>
   </div>
  )
}

export default Bidpage