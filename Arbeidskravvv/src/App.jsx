import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ListAppear from './ListAppear'
import FilmPicked from './FilmPicked'

function SlayMovieTitle(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [showBondList, setShowBondList] = useState(true);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const Search = async (event) => {

    event.preventDefault();
    setShowBondList(false);

    setLoading(true);

    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent (query)}`;


    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);

      }

    } catch (err) {
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <section className="App">

      <h1>Movie Search</h1>

      <form onSubmit={Search}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Søk etter film her"
        />

        <button type="submit">Search</button>

      </form>
      {showBondList && (
        <>
          <h2>James Bond Movies</h2>
          <ListAppear apiKey={API_KEY} />
        </>
      )}
      {loading && <p>Loader.</p>}

      <ul style={{listStyle:'none',padding:0}}>

        {movies.map(movie => (

          <li key={movie.imdbID}>
            <Link
              to={`/${SlayMovieTitle(movie.Title)}`}
              state={{ movie }}
            >
              <strong>{movie.Title}</strong>
            </Link>{' '}
            ({movie.Year})
            {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} />}
          </li>

        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:movie" element={<FilmPicked />} />
    </Routes>
  );
}

export default App
