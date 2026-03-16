import {useState} from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import './App.css'

import ListAppear from './ListAppear'
import FilmPicked from './FilmPicked'

function SlayMovieTitle(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'); //fikk hjelp av ai til å bygge denne funksjonen siden jeg sleit en del 
}

function Page() {

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [showBondList, setShowBondList] = useState(true);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const Search = async (event) => {

    event.preventDefault();
    setShowBondList(false);

    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent (query)}`; //fikk hjelp av ai tii å bygge denne url-en rund api keyen og litt hjelp med å sørge for at det funka. github copiolot


    try {
      const gets = await fetch(API_URL);
      const data = await gets.json();

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
          onChange={Event => setQuery(Event.target.value)}
          placeholder="Søk etter film her"
        />

        <button type="submit">Søk</button>

      </form>
      
      {showBondList && (

        <>
          <ListAppear apiKey={API_KEY}/>
        </>

      )}


      <ul>

        {movies.map(movie => (

          <li key={movie.imdbID}>

            <Link
              to={`/${SlayMovieTitle(movie.Title)}`}
              state={{ movie }}
            >
              <strong>{movie.Title}</strong>

            </Link>{' '}''{movie.Poster !== 'N/A' && <img src={movie.Poster}/>}

          </li>

        ))}
      </ul>
    </section>
  );
}

function App() {
  return (

    <Routes>

      <Route path="/" element={<Page/>}/>
      <Route path="/:movie" element={<FilmPicked/>}/>

    </Routes> //fikk litt hjelp av ai med rautes også, siden den fårslo noe her mens jeg gjorde det, og det funka så jeg beholdt det

  );
}

export default App
