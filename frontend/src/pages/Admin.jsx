import React, { useEffect } from 'react'
import { useUser } from '../UserContext'
import AdminCard from '../layout/AdminCard'

function Admin() {
    const {user} = useUser()
    const [auctions, setAuctions] = React.useState([])

    function reload() {
        fetch('http://localhost:5500/api/bids/unapproved')
        .then(res => res.json())
        .then(data => 
            setAuctions(data)
            )
    }

    useEffect(() => {
       reload()
    }
    , [])

    function deleteAuction(id) {
        fetch('http://localhost:5500/api/bids/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            reload()
        })
    }

    if(!user) return null

    if(user.type !== 'admin') return (
        <div className='flex p-5 flex-col'>
            <div className="flex h-52 justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold">You are not an admin</h1>
                </div>
            </div>
        </div>
    )
  return (
    <div className='flex p-5 flex-col gap-5'>
        <div className="flex h-52 justify-center items-center bg-[#0000004a] rounded-md" style={
            {
                backgroundImage: `url("https://images.unsplash.com/photo-1611174676800-9e3a7d6b2c2b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXVjdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'       
            }
        }>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Welcome To Amin Panel, {user.name}</h1>
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <h2 className='sm:text-3xl text-xl'>
                Unapproved Auctions ({auctions.length})
            </h2>
            <div className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full
            ">
                {
                    auctions.map(auction => <AdminCard key={auction._id} auction={auction}  reload={reload} />)
                }
            </div>
        </div>
    </div>
  )
}

export default Admin