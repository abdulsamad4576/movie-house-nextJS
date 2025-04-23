import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import Link from 'next/link';
import movieData from '../data.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home(props) {
  const router = useRouter();

  return (
    <div>
      <h1>Movie House</h1>
      <h2>Trending Movies</h2>
      
      <div className="movie-list">
        {props.trending.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>
              <Link href={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </h3>
            <p>{movie.releaseYear}</p>
            <p className="rating">Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
      
      <button onClick={() => router.push('/genres')}>Browse Genres</button>
    </div>
  );
}

export async function getStaticProps() {
  const trending = movieData.movies.filter(item=>item.rating>8.1);//trending by ratingg
  return {
    props: {
      trending,
    },
    revalidate: 5,
  };
}