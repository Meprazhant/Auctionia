import React from 'react'

function IndexStats() {
  return (
    <div className=" pt-10  flex flex-col p-5" 
    style={
        {
            backgroundImage: 'url(https://i.ytimg.com/vi/YUOgzB63IRo/maxresdefault.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%',
            backgroundAttachment: 'fixed'
        }
    } >
         <div className="flex justify-center items-center">
            <h2 className='text-3xl font-bold pb-5'>Our Stats and Achievements</h2>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal shadow ">
           
          
          <div className="stat">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">38</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
          
          <div className="stat">
        <div className="stat-title">Items on Bid</div>
        <div className="stat-value">22</div>
        <div className="stat-desc">↗︎ 16 (80%)</div>
          </div>
          
          <div className="stat">
        <div className="stat-title">Total Items Sells</div>
        <div className="stat-value">18</div>
        <div className="stat-desc">↘︎ 4 (20%)</div>
          </div>
          
        </div>
    </div>
  )
}

export default IndexStats