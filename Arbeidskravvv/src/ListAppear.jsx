import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function slugifyMovieTitle(title) {
	return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function ListAppear({ apiKey, onError }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		if (!apiKey) {
			onError?.('Missing OMDB API key. Add VITE_OMDB_API_KEY to .env.local and restart the dev server.');
			return;
		}

		const bondMovieIds = [
			'tt0055928',
			'tt0057076',
			'tt0058150',
			'tt0059800',
			'tt0062512',
			'tt0064757',
			'tt0066995',
			'tt0070328',
			'tt0071807',
			'tt0076752'
		];

		const loadBondMovies = async () => {
			try {
				const movieResponses = await Promise.all(
					bondMovieIds.map((id) => fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`))
				);

				const movieData = await Promise.all(movieResponses.map((res) => res.json()));
				const validMovies = movieData
					.filter((movie) => movie.Response === 'True')
					.map((movie) => ({
						imdbID: movie.imdbID,
						Title: movie.Title,
						Year: movie.Year,
						Poster: movie.Poster
					}));

				setMovies(validMovies);
			} catch (err) {
				onError?.('Could not load James Bond movies on startup.');
			}
		};

		loadBondMovies();
	}, [apiKey, onError]);

	if (!movies.length) {
		return null;
	}

	return (
		<ul>
			{movies.map((movie) => (
				<li key={movie.imdbID}>
					<Link to={`/${slugifyMovieTitle(movie.Title)}`} state={{ movie }}>
						<strong>{movie.Title}</strong>
					</Link>{' '}
					({movie.Year})
					<br />
					{movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} />}
				</li>
			))}
		</ul>
	);
}

export default ListAppear;
