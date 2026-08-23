import './globals.css';
import FloatingActions from './components/FloatingActions/FloatingActions';
import Providers from './Providers';

export const metadata = {
  title: 'Critic Solutions — Digital Marketing & Software That Grows Your Brand',
  description:
    'Critic Solutions builds high-performance web applications, enterprise software, and digital marketing systems for ambitious businesses across Pakistan and beyond.',
  keywords: 'web development, digital marketing, software solutions, ERP, UI/UX, Lahore, Pakistan',
  openGraph: {
    title: 'Critic Solutions',
    description: 'Building Seamless Digital Experiences',
    url: 'https://Criticpicksolutions.com',
    siteName: 'Critic Solutions',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
