import type { Metadata } from "next";
import { Patua_One, Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const patuaOne = Patua_One({
  weight: "400",
  variable: "--font-patua-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ro Baldovino Portfolio",
  description: "Welcome to the portfolio of Roland Baldovino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${patuaOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
