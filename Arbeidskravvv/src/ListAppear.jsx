import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function slayMovieTitle(title) {
	return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function ListAppear({apiKey}) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {

		const loadBondMovies = async () => {
			try {
				const response = await fetch(
					`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent('James Bond')}`
				);
				const data = await response.json();

				if (data.Response === 'True') {
					setMovies(data.Search);
				} else {
					setMovies([]);
				}
			} catch (err) {
				setMovies([]);
			}
		};

		loadBondMovies();
	}, [apiKey]);

	if (!movies.length) {
		return null;
	}

	return (
		<ul>
			{movies.map((movie) => (

				<li key={movie.imdbID}>

					<Link to={`/${slayMovieTitle(movie.Title)}`} state={{movie}}>

						<strong>{movie.Title}</strong>
						<p>{movie.Year}</p>
						
					</Link>{' '}''

					{movie.Poster !== 'N/A' && <img src={movie.Poster}/>}

				</li>
			))}
		</ul>
	);
}

export default ListAppear;
