import type { Metadata } from "next";
import { Smooch_Sans } from "next/font/google";
import "./globals.css";

const smoochSans = Smooch_Sans({
  variable: "--font-smooch-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habits",
  description: "A simple habit tracker, with a focus on data privacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${smoochSans.variable} font-smooch antialiased`}>
        {children}
      </body>
    </html>
  );
}
