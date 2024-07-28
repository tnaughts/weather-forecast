import axios from "axios";
import styles from "./WeatherPage.module.css";

const WeatherPage = ({ forecast, zip }) => {
  const groupByDate = (list) => {
    return list.reduce((acc, weather) => {
      const date = new Date(weather.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(weather);
      return acc;
    }, {});
  };

  const groupedForecast = groupByDate(forecast.list);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>5-Day Weather Forecast for {zip}</h1>
      {Object.keys(groupedForecast).map((date) => (
        <div key={date} className={styles.dateGroup}>
          <h2 className={styles.dateHeader}>{date}</h2>
          <div className={styles.forecast}>
            {groupedForecast[date].map((weather, index) => (
              <div key={index} className={styles.forecastItem}>
                <p className={styles.time}>
                  {new Date(weather.dt * 1000).toLocaleTimeString()}
                </p>
                <p className={styles.temperature}>{weather.main.temp}°F</p>
                <p className={styles.description}>
                  {weather.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { zip } = params;
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/weather?zip=${zip}`;

  try {
    const response = await axios.get(url);
    const forecast = response.data;

    return {
      props: {
        forecast,
        zip,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default WeatherPage;
