// pages/_app.js
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import "../styles/globals.css"; // Ensure global styles are imported

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route is not the homepage
  const showNavBar = router.pathname.startsWith("/weather/");

  return (
    <>
      {showNavBar && <NavBar />}
      <main style={{ paddingTop: showNavBar ? "60px" : "0" }}>
        {" "}
        {/* Add padding to avoid overlap */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
