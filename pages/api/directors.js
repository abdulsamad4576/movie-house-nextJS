import movieData from '../../data.json';

export default function handler(req, res) {
    const moviesByDirector = {};

    movieData.movies.forEach(movie => {
        if (!moviesByDirector[movie.directorId]) {
            moviesByDirector[movie.directorId] = [];
        }
        moviesByDirector[movie.directorId].push(movie);
    });
    
    res.status(200).json({
        directors: movieData.directors,
        moviesByDirector,
    });
}