import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "/images/cloud.png"
  });
  const [name, setName] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=bba287986fa850548253c7e7f958fbe4&units=metric`;
      axios
        .get(apiUrl)
        .then(res => {
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/images/cloud.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/images/clear.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/images/rainy.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/images/snow.png";
          } else {
            imagePath = "/images/cloud.png";
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            toast.error("Invalid City Name");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={e => setName(e.target.value)}
          />
          <button>
            <img src="/images/search.png" alt="" onClick={handleClick} />
          </button>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)} °C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity_7059381.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/cloud_6631380.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
