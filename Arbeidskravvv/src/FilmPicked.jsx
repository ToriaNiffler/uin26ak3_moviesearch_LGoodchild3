import { Link, useLocation, useParams } from 'react-router-dom';

function slugToTitle(slug = '') {
	return slug
		.split('-')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function FilmPicked() {
	const { movie } = useParams();
	const location = useLocation();
	const pickedMovie = location.state?.movie;

	const titleFromSlug = slugToTitle(movie);
	const pageTitle = pickedMovie?.Title || titleFromSlug || 'Film';

	return (
		<section className="App">
			<h1>{pageTitle}</h1>
			{pickedMovie?.Year && <p>Year: {pickedMovie.Year}</p>}
			{pickedMovie?.Poster && pickedMovie.Poster !== 'N/A' && (
				<img src={pickedMovie.Poster} alt={pageTitle} />
			)}
			<p>
				<Link to="/">Tilbake til forsiden</Link>
			</p>
		</section>
	);
}

export default FilmPicked;
