import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="container">
      <nav>
        <ul className="nav-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/genres">Genres</a></li>
          <li><a href="/directors">Directors</a></li>
          <li><a href="/help">Help</a></li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
