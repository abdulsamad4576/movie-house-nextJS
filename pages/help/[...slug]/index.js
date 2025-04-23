import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HelpPage(props) {
    let content=props.content
    let title=props.title
    const router = useRouter();
  
    return (
        <div>
        <h1>{title}</h1>
        <p>{content}</p>
        
        <div>
            <ul>
                <li><Link href="/help/faqs">FAQs</Link></li>
                <li><Link href="/help/contact">Contact</Link></li>
                <li><Link href="/help/privacy">Privacy</Link></li>
            </ul>
        </div>
        
        <div>
            <Link href="/">Back to Home</Link>
        </div>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [
        { params: { slug: ['faqs'] } },
        { params: { slug: ['contact'] } },
        { params: { slug: ['privacy'] } }
        ],
        fallback: false
    };
}

export async function getStaticProps(context) {
    const slug = context.params.slug[0] || '';
    
    let content = 'Welcome to Help Center';
    let title = 'Help Center';
    
    if (slug === 'faqs') {
        title = 'Frequently Asked Questions';
        content = 'Here are answers to common questions.';
    } else if (slug === 'contact') {
        title = 'Contact Us';
        content = 'Reach us at contact@moviehouse.com';
    } else if (slug === 'privacy') {
        title = 'Privacy Policy';
        content = 'Our privacy policy details.';
    }
    
    return {
        props: {
            content,
            title
        }
    };
}