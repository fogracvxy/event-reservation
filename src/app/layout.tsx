import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "./_components/Navbar";
export const metadata: Metadata = {
  title: "SummerKick Duga Resa event reservation",
  description: "Event reservation for SummerKick created by MSpudicDesign",
  icons: {
    icon: ["/icon.ico"],
    apple: ["/icon.ico"],
  },
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
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
