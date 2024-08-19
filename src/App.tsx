import React, { useState } from "react";
import "./App.css";
import index from "./img/index.js";
import { broken,smoke,rain,clear} from "./Background/index.ts"
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

function App() {
  const [temp, setTemp] = useState(0);
  const [weath, setWeath] = useState("");
  const [inputName, setInputName] = useState("");
  const [airPressure, setAirPressure] = useState(0);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const [image, setImage] = useState(broken);
  const cheakWeather =async () => {
    setError("");

      try {
        const finalInput = inputName.toLowerCase().trim();
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${finalInput}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`
        );

        const data: WeatherResponse = await response.json();
        if (response.ok) {
         
          console.log(data.weather[0].main);
          
          setWeath(data.weather[0].main);
          setTemp(data.main.temp);
          setAirPressure(data.main.pressure);
          console.log(weath ,"ASd") ;
        
   
            if (data.weather[0].main ==  "Smoke") {
              setImage(smoke);
            } else if (data.weather[0].main == "Rain") {
              setImage(rain);
            }
            else if (data.weather[0].main == "Clear") {
              setImage(clear);
            }
            else if (data.weather[0].main == "Clouds") {
              setImage(smoke);
            }
            console.log(image);
          

          
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
    
  };

  return (
    <div className="bg-zinc-900">
      <div
        className="w-full 
    flex items-center justify-center
  h-screen
      text-slate-50 "
      >
        <div className="w-96    rounded-xl relative">
          <img src={image} className="w-screen h-[85vh] rounded-xl" alt="" />
        </div>
        <div
          className="flex-col
      flex items-start justify-center
      absolute top-18 p-4"
        >
          <div className="">
            <h3 className="text-center text-2xl font-bold text-black ">
               {weath}
            </h3>
            <img src={index.svg} alt="" />
          </div>
          <div className="">
            <h3 className="text-center text-5xl font-bold text-black">
              {temp}{" "}
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
          </div>
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
    </div>
  );
}

export default App;
