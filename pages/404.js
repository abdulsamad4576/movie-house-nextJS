import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <div className="movie-card" style={{ maxWidth: '500px', margin: '30px auto' }}>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button onClick={() => router.push('/')}>Go Home</button>
      </div>
    </div>
  );
}