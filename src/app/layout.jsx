import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import UserProvider from "@/contexts/UserProvider";
import ReadProvider from "@/contexts/ReadProvider";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/common/Layout";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Readme App",
  description: "Inge SoftII",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <UserProvider>
            <ReadProvider>
              <Toaster
                position="top-center"
                containerStyle={{ zIndex: 99999 }}
              />
              <Layout />
              <div>
                {children}
              </div>
              <Footer />
            </ReadProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
