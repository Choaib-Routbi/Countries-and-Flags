import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [names, setNames] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [showFlags, setShowFlags] = useState(true)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setNames(data)
      })
  }, []) // Only run once on mount

  // Filter countries by search input (case-insensitive)
  const filteredCountries = names.filter(
    (item) =>
      searchInput.trim() !== "" &&
      item.name.common.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <>
      <div className='app-container'>
        <h1>Countries and Flags</h1>
        <div className='search-container'>
          <input
            className='search-input'
            type="text"
            placeholder='Search country'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input 
          className='show-btn'
          type='button'
          value='Show all'
          onClick={() => setShowFlags((prev) => !prev)}
          />
        </div>
        <div className='content-container'>
          <ul>
            {showFlags ? (
              names.map((item) => (
                <li key={item.name.common} className='country-block'>
                  <p className='country-name'>{item.name.common}</p>
                  {item.flags.png && (
                    <img className='flag' src={item.flags.png} alt={`${item.name.common} flag`} />
                  )}
                </li>
              ))
            ) : searchInput.trim() === "" ? (
              <p>Type to search country.</p>
            ) : filteredCountries.length === 0 ? (
              <p>No country found.</p>
            ) : (
              filteredCountries.map((item) => (
                <li key={item.name.common} className='country-block'>
                  <p className='country-name'>{item.name.common}</p>
                  {item.flags.png && (
                    <img className='flag' src={item.flags.png} alt={`${item.name.common} flag`} />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
