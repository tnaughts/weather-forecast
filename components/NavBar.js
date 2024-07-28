// components/NavBar.js
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./NavBar.module.css"; // Import CSS module for styling

const NavBar = () => {
  const [zip, setZip] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip && router.pathname !== "/") {
      router.push(`/weather/${zip}`);
    } else if (zip) {
      router.push(`/weather/${zip}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Weather App</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={zip}
          onChange={handleInputChange}
          placeholder="Enter ZIP code"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
