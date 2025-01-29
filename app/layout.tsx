import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import AppProvider from "@/components/AppContext.js"
import { Footer } from "./footer";
import { getSession } from "@/actions/getUser";
import Header from "./HeaderMain";
import AppContextProvider from "../context/AppContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "File Storage App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();

  console.log(session);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        sm:max-w-[87.5%] max-w-[99.5%] mx-auto`}
      >
        <AppContextProvider>
        <AppProvider session>
          <Header session={session} />
        {children}
        <Toaster />
        <Footer />
        </AppProvider>
        </AppContextProvider>
        
          
      </body>
    </html>
  );
}
