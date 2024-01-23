import React from 'react'
import Timeline from '../layout/Timeline'
import IndexStats from '../layout/IndexStats'
import Footer from '../layout/Footer'

function Home() {
  return (
   <div className="flex flex-col">
     <div className="hero min-h-screen" style={{backgroundImage: 'url(https://wallpaperaccess.com/full/1209666.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%',
            backgroundAttachment: 'fixed'}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-white">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello User</h1>
        <p className="mb-5">
            Sell your Arts and Crafts. Just upload your product and start for bidding. And also you can bid on other products.
        </p>
        <button className="btn btn-primary">Login To Start</button>
      </div>
    </div>

  </div>
  <Timeline/>
  <IndexStats/>
  <Footer/>

   </div>
  )
}

export default Home