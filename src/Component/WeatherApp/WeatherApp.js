import React, { useState } from 'react';
import './WeatherApp.css';
import axios from 'axios';

// Images
import search_icon from '../Assets/search.png'
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';


export default function WeatherApp() {
    const [inputVal, setInputVal] = useState('');
    const [wIcon, setWIcon] = useState(cloud_icon);
    const [temp, setTemp] = useState(24);
    const [location, setLocation] = useState('London');
    const [humidity, setHumidity] = useState(64);
    const [wind, setWind] = useState(18);

    let api_key = '5e9d83f6c8c8a1f65783de9f7df6e6c9';

    const search = async (e) => {
        if (inputVal === '') {
            return null;
        }

        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=Metric&appid=${api_key}`)
        // console.log(res.data);

        setTemp(res.data.main.temp);
        setLocation(res.data.name);
        setHumidity(res.data.main.humidity);
        setWind(Math.floor(res.data.wind.speed));

        if (res.data.weather[0].icon === '01d' || res.data.weather[0].icon === '01n') {
            setWIcon(clear_icon)
        }
        else if (res.data.weather[0].icon === '02d' || res.data.weather[0].icon === '02n') {
            setWIcon(cloud_icon);
        }
        else if (res.data.weather[0].icon === '03d' || res.data.weather[0].icon === '03n') {
            setWIcon(drizzle_icon);
        }
        else if (res.data.weather[0].icon === '04d' || res.data.weather[0].icon === '04n') {
            setWIcon(drizzle_icon);
        }
        else if (res.data.weather[0].icon === '09d' || res.data.weather[0].icon === '09n') {
            setWIcon(rain_icon);
        }
        else if (res.data.weather[0].icon === '10d' || res.data.weather[0].icon === '10n') {
            setWIcon(rain_icon);
        }
        else if (res.data.weather[0].icon === '13d' || res.data.weather[0].icon === '13n') {
            setWIcon(snow_icon);
        }
        else {
            setWIcon(clear_icon);
        }
    }

    return (
        <>
            <div className='container'>
                {/* <h1 className='fw-bold text-center my-1' style={{color:'#3b2f80'}}>Weather App</h1> */}
                <div className='row justify-content-center mt-5'>
                    <div className='col-5'>

                        <div className='box'>
                            <div className='top-bar d-flex justify-content-center'>
                                <input type='text' className='form-control w-75 ps-4 me-2' id='name' placeholder='Search' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                                <div className='d-flex justify-content-center align-items-center p-3 bg-white' onClick={(e) => search(e)}>
                                    <img src={search_icon} alt='Search Icon' />
                                </div>
                            </div>
                            <div className='text-center text-white my-2'>
                                <img src={wIcon} alt='Cloud Icon' />
                                <h1 className='fw-bold display-5 mb-0'>{temp}<sup>0</sup>C</h1>
                                <h4 className='fw-bold mb-0'>{location}</h4>
                            </div>
                            <div className='row mt-5'>
                                <div className='col'>
                                    <div className='d-flex justify-content-center text-white'>
                                        <img src={humidity_icon} alt="Humidity Icon" className='icon-size mt-1' />
                                        <div className='ms-2'>
                                            <h5 className='mb-0'>{humidity}%</h5>
                                            <p className='mb-0'>Himidity</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='d-flex justify-content-cente text-white'>
                                        <img src={wind_icon} alt="Wind Icon" className='icon-size mt-1' />
                                        <div className='ms-2'>
                                            <h5 className='mb-0'>{wind} km/h</h5>
                                            <p className='mb-0'>Wind Speed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}