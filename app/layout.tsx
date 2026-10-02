import { Cairo } from "next/font/google";
import "../styles/globals.scss";
import 'react-loading-skeleton/dist/skeleton.css';

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${cairo.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cairo.className}>{children}</body>
    </html>
  );
}

