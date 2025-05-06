import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Providers from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reelify",
  description: "ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
