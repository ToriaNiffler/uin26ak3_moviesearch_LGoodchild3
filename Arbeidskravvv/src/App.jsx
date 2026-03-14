import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies.');
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <section className="App">
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul style={{listStyle:'none',padding:0}}>
        {movies.map(movie => (
          <li key={movie.imdbID} style={{margin:'10px 0'}}>
            <strong>{movie.Title}</strong> ({movie.Year})<br />
            {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} style={{width:'100px'}} />}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App
