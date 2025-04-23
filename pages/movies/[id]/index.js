import Link from 'next/link';
import movieData from '../../../data.json';

export default function MovieDetail(props) {
    let movie=props.movie;
    let genre=props.genre;
    let director=props.director;
    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            
            <div className="movie-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                <p className="rating"><strong>Rating:</strong> {movie.rating}</p>
                
                {genre && (
                <p><strong>Genre:</strong> {genre.name}</p>
                )}
                
                {director && (
                <p>
                    <strong>Director:</strong> {' '}
                    <Link href={`/movies/${movie.id}/director`}>
                    {director.name}
                    </Link>
                </p>
                )}
            </div>
            
            <div>
                <Link href="/movies" className="back-link">
                Back to Movies
                </Link>
            </div>
            </div>
    );
}

export async function getStaticPaths() {
    let data= await movieData;
    return {
        paths: data.movies.map(movie => ({
            params: { id: movie.id }
        })),
        fallback: true, 
    };
}

export async function getStaticProps(context) {
    let data= await movieData;
    const movie = data.movies.find(m => m.id === context.params.id);
    
    if (!movie) {
        return {
            notFound: true, 
        };
    }
    
    const genre = data.genres.find(g => g.id === movie.genreId);
    const director = data.directors.find(d => d.id === movie.directorId);
    
    return {
        props: {
            movie,
            genre: genre || null,
            director: director || null,
        },
        revalidate: 5,
    };
}