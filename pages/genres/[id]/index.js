import Link from 'next/link';
import movieData from '../../../data.json';

export default function GenreDetail(props) {
    let genre=props.genre
    let movies=props.movies
    if (!genre) {
        return <div>Genre not found</div>;
    }

    return (
        <div>
        <h1>{genre.name} Movies</h1>
        
        {movies.length > 0 ? (
            <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                    <p>{movie.title} ({movie.releaseYear})</p>
                </Link>
                </li>
            ))}
            </ul>
        ) : (
            <p>No movies found in this genre.</p>
        )}
        
        <div>
            <Link href="/genres">
                <p>Back to Genres</p>
            </Link>
        </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    let data=await movieData;
    const genre = data.genres.find(g => g.id === context.params.id);
    
    if (!genre) {
        return {
        notFound: true,
        };
    }
    
    const movies = data.movies.filter(movie => movie.genreId === genre.id);
    
    return {
        props: {
        genre,
        movies,
        },
    };
}