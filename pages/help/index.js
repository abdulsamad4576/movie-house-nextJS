import Link from 'next/link';

export default function HelpIndex() {
    return (
        <div>
        <h1>Help Center</h1>
        <p>Select help page from below:</p>
        
        <ul>
            <li><Link href="/help/faqs">FAQs</Link></li>
            <li><Link href="/help/contact">Contact</Link></li>
            <li><Link href="/help/privacy">Privacy</Link></li>
        </ul>
        
        <div>
            <Link href="/">Back to Home</Link>
        </div>
        </div>
    );
}