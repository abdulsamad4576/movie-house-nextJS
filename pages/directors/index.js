import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
    const { data, error } = useSWR('/api/directors', fetcher);
    
    if (error) return <div>Failed to load directors</div>;
    if (!data) return <div>Loading...</div>;
    
    return (
        <div>
        <h1>Directors</h1>
        
        {data.directors.map(director => (
            <div key={director.id}>
            <h2>{director.name}</h2>
            <p>{director.biography}</p>
            
            <h3>Movies:</h3>
            <ul>
                {data.moviesByDirector[director.id]?.map(movie => (
                <li key={movie.id}>
                    <Link href={`/movies/${movie.id}`}>
                        <p>{movie.title} ({movie.releaseYear})</p>
                    </Link>
                </li>
                ))}
            </ul>
            </div>
        ))}
        
        <div>
            <Link href="/">
                <p>Back to Home</p>
            </Link>
        </div>
        </div>
    );
}