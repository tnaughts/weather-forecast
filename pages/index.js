// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [zip, setZip] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip) {
      router.push(`/weather/${zip}`);
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zip}
          onChange={handleInputChange}
          placeholder="Enter ZIP code"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default Home;
