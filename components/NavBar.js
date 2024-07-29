import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [zip, setZip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/^\d{5}$/.test(zip)) {
      router.push(`/weather/${zip}`);
    } else {
      alert("Invalid zip code. Please enter a 5-digit zip code.");
    }
  };

  if (router.pathname === "/") return null;

  return (
    <nav className={styles.navbar}>
      <form onSubmit={handleSubmit} className={styles.navForm}>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter zip code"
          className={styles.input}
          maxLength={5}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
