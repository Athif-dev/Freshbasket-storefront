import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ReduxProvider from "./store/reduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="custom-scrollbar">
        {" "}
        <ReduxProvider>
          <Navbar />
        </ReduxProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
