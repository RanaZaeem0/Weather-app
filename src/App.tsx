import React, { ChangeEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import index from "./img/index.js";

function App() {
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState(0);
  const [weath, setWeath] = useState("");
  const [inputName, setInputName] = useState("");
  const [airPressure, setAirPressure] = useState(0);
  const [error, setError] = useState("");
  const [img,setImg] = useState("index.hot")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  interface Coord {
    lon: number;
    lat: number;
  }

  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }

  interface Wind {
    speed: number;
    deg: number;
  }

  interface Clouds {
    all: number;
  }

  interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  interface WeatherResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  const [image, setImage] = useState(index.hot);
  const cheakWeather = () => {
    setError("");
    async function data() {
      try {
        const finalInput = inputName.toLowerCase().trim();
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${finalInput}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`
        );

        const data: WeatherResponse = await response.json();
        if (data) {
          const temp = data.main.temp;
          const airPressure = data.main.pressure;
          const disurbe = data.weather[0].main;
          setWeath(disurbe);
          setTemp(temp);
          setAirPressure(airPressure);
          const showPicture = () => {
            console.log(temp);

            if (temp > 5) {
              setImage(index.hot);
            } else if (temp < 6) {
              setImage(index.winter);
            }
            console.log(image);
          };
          showPicture();
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error.message == "Failed to fetch") {
            setError("Your Internet not Working");
          } else if (
            error.message ==
            "Cannot read properties of undefined (reading 'temp')"
          ) {
            setError("City is not avalible");
          } else {
            setError(error.message);
          }
        }
      }
    }
    data();
  };

  return (
    <>
      <h1 className="text-center bg-slate-500 text-3xl font-bold text-black">
        Cheak Weather{" "}
      </h1>
      <div
        className="w-full 
    flex items-center justify-center
  h-[85vh]
    bg-slate-400  text-slate-50 "
      >
        <div className="w-96   rounded-xl relative">
          <img
            src={image}
            className="w-screen h-96 rounded-xl"
            alt=""
          />
        </div>
        <div
          className="flex-col
      flex items-start justify-center
      absolute top-18 p-4"
        >
          <div className="">
            <h3 className="text-center text-2xl font-bold text-black ">
              {weath}{" "}
            </h3>
            <img src={index.svg} alt="" />
          </div>

          <h3 className="text-center text-2xl font-bold text-black">
            Tempreture {temp}{" "}
          </h3>

          <h3 className="text-center text-1xl text-neutral-600">
            Air Pressure {airPressure}
          </h3>
          <label
            htmlFor=""
            className="text-black
      font-bold"
          >
            City name :{inputName}
          </label>
          <input
            type="text"
            className="rounded-lg text-2xl text-black p-3"
            onChange={handleInputChange}
          />
          <h4 className="text-red-500 font-semibold ">{error}</h4>
          <button
            className="mt-4 p-2 cursor-pointer bg-black rounded-xl text-center"
            onClick={cheakWeather}
          >
            Cheak Weather
          </button>
        </div>
      </div>
    </>
  );
}

export default App;