import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function slayMovieTitle(title) {
	return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

function ListAppear({apiKey}) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {

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
		]; //fikk hjelp av ai til å finne disse id-ene

		const loadBondMovies = async () => {
			try {
				const movieResponses = await Promise.all(
					bondMovieIds.map((id) => fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`))
				);

				const movieThing = await Promise.all(movieResponses.map((gets) => gets.json()));
				const validMovies = movieThing

					.filter((movie) => movie.Response === 'True')
					
					.map((movie) => ({
						imdbID: movie.imdbID,
						Title: movie.Title,
						Poster: movie.Poster
					}));

				setMovies(validMovies);
			} catch (err) {
		
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
						
					</Link>{' '}''

					{movie.Poster !== 'N/A' && <img src={movie.Poster}/>}

				</li>
			))}
		</ul>
	);
}

export default ListAppear;
