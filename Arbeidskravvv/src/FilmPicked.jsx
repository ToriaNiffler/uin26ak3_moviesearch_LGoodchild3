import {Link, useLocation, useParams} from 'react-router-dom';

function ToTitle(slay = '') {
	return slay
		.split('-')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function FilmPicked() {

	const {movie} = useParams();
	const location = useLocation();

	const pickedMovie = location.state?.movie;

	const titleFrom = ToTitle(movie);
	const pageTitle = pickedMovie?.Title || titleFrom || 'Film';

	return (
		<section className="App">

			<h1>{pageTitle}</h1>

			{pickedMovie?.Poster && pickedMovie.Poster !== 'N/A' && (
				<img src={pickedMovie.Poster}/>
			)}

			<p>
				<Link to="/">forsiden</Link>
			</p>

		</section>
	);
}

export default FilmPicked;
