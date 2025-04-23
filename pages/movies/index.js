import Link from 'next/link';
import { useState } from 'react';
import movieData from '../../data.json';

export default function Movies(props) {
    let allmovies=props.movies;
    let allgenres = props.genres || [];
    const [genre, setgenre] = useState('');
    let filteredMovies;
    if (genre) {
        filteredMovies = allmovies.filter(movie => movie.genreId === genre);
    } else {
        filteredMovies = allmovies;
    }

    return (
    <div>
        <h1>All Movies</h1>
        <div>
        <label htmlFor="genres-filter">Filter by Genre: </label>
        <select 
            id="genres-filter"
            value={genre} 
            onChange={(e) => setgenre(e.target.value)}
        >
            <option value="">All Genres</option>
                {allgenres.map(genre => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
        </div>
        
        <div className="movie-list">
            {filteredMovies.map(movie => (
                <div key={movie.id} className="movie-card">
                <h3>
                    <Link href={`/movies/${movie.id}`}>
                        <p>{movie.title}</p>
                    </Link>
                </h3>
                <p>Release Year: {movie.releaseYear}</p>
                <p className="rating">Rating: {movie.rating}</p>
                </div>
            ))}
        </div>
        
        <div>
        <Link href="/">
            <p>Back to Home</p>
        </Link>
        </div>
    </div>
    );
}

export async function getStaticProps() {
    let data=await movieData;
    return {
        props: {
            movies: data.movies,
            genres: data.genres,
        },
        revalidate: 5,
    };
}