import { useState } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState('')
  const [movie, setMovie] = useState([])

  const fetchApi = async (search) => {
    if (!search) alert("Enter a Movie Name")
    const url = `https://www.omdbapi.com/?apikey=6d88ed66&s=${search}`
    try {
      const response = await fetch(url)
      const finalData = await response.json()
      console.log(finalData)
      if (finalData.Response === "True") {
        setMovie(finalData.Search); 
      } else {
        console.error("Movies not found");
        alert("Movies not found")
      }
    } 
    catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const searchBtn = () => {
    fetchApi(search)
    setSearch('')

  }


  return (
    <>
      <nav>
        <h2>Movie Search App</h2>
      </nav>

      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder='Enter Movie '
            value={search}
            onChange={(e) => { setSearch(e.target.value) }} />
          <button onClick={searchBtn}>Search</button>
        </div>

        <div className="newContainer">
          {movie.map((movie, index) => (
            <div key={index} className="card">
              <img width={200} src={movie.Poster} alt='poster not found' />
              <div className="details">
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  )
}

export default App
