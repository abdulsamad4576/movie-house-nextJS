import Link from 'next/link';
import movieData from '../../../../data.json';

export default function DirectorDetail(props) {
    let movie=props.movie
    let director=props.director
    let directedMovies=props.directedMovies
    if (!director) {
        return <div>Director not found</div>;
    }
    return (
        <div>
        <h1>{director.name}</h1>
        <p><strong>Biography:</strong> {director.biography}</p>
        <h2>Movies Directed:</h2>
            <ul>
                {directedMovies.map(m => (
                <li key={m.id}>
                    <Link href={`/movies/${m.id}`}>
                        <p>{m.title} ({m.releaseYear})</p>
                    </Link>
                </li>
                ))}
            </ul>
            <div>
                <Link href={`/movies/${movie.id}`}>
                    <p>Back to {movie.title}</p>
                </Link>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    let data=await movieData;
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

    const director = data.directors.find(d => d.id === movie.directorId);

    if (!director) {
        return {
        notFound: true,
        };
    }

    const directedMovies = data.movies.filter(m => m.directorId === director.id);

    return {
        props: {
            movie,
            director,
            directedMovies,
        },
        revalidate: 5,
    };
}