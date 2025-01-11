import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      
      <h1>Welcome to the Home Page</h1>
      <p>Click the button below to go to the login page.</p>
      <Link href="/main/login">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Go to Login
        </button>
      </Link>
    </div>

    </div>
    
  );
}
