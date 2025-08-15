
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from '../components/Navigation';
import AuthGuard from '../components/AuthGuard';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "SheCare - Empowering Women in KwaZulu-Natal",
  description: "Find Clinics, Track Your Cycle, Support Your Mind, and Share Your Voice — All Free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body className={`${poppins.variable} font-poppins antialiased bg-white`}>
        <AuthGuard>
          <div className="min-h-screen pb-20">
            {children}
          </div>
          <Navigation />
        </AuthGuard>
      </body>
    </html>
  );
}
