import React from 'react'
import { useParams } from 'react-router-dom'

function Search() {
  const {query} = useParams()
  if(!query) {
    window.location.href = "/"
  }
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([])
  function searchBids(){
    fetch("http://localhost:5500/api/search/"+query)
    .then((response) => response.json())
    .then((data) => {
      setLoading(false)
      setData(data)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  React.useEffect(() => {
    searchBids()
  }, [])

  if(loading) {
    return (
      <div className="min-h-screen p-3 bg-base-200 w-full">
        <h1 className="mb-5 text-2xl font-bold">Searching for "{query}"</h1>
      </div>
    )
  }
  return (
    <div className="min-h-screen p-3 bg-base-200 w-full flex-col">
        <h1 className="mb-5 text-2xl font-bold">Search Results for "{query}"</h1>
    </div>
  )
}

export default Search