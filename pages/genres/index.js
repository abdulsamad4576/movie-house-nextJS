import Link from 'next/link';
import movieData from '../../data.json';

export default function Genres(props) {
    let genres=props.genres
    return (
        <div>
            <h1>Browse Genres</h1>
            
            <div className="movie-list">
                {genres.map(genre => (
                <div key={genre.id} className="movie-card">
                    <h3>
                    <Link href={`/genres/${genre.id}`}>
                        {genre.name}
                    </Link>
                    </h3>
                </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    let data= await movieData.genres;
    return {
        props: {
            genres: data,
        },
    };
}