import React, {useState } from 'react'
import './index.css'
import {MdSearch} from "react-icons/md";
import axios from 'axios'
function Home() {

   const[data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png',
   })
    
  const[name , setName] = useState('');
  const[error, setError] = useState('');
  const handleClick = () => {
    if(name !==""){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1f085b2e58d975a78aa7fcf62289d6a4&units=metric`;
   axios.get(apiUrl)
   .then(res => {
      let imagePath = '';
      if(res.data.weather[0].main === "Clouds"){
        imagePath = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png"
      }else if(res.data.weather[0].main === "Clear"){
        imagePath = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-64.png"
      }else if(res.data.weather[0].main ==="Rain"){
        imagePath = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-64.png"
      }else if(res.data.weather[0].main === "Drizzle"){
        imagePath = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-64.png"
      }else if(res.data.weather[0].main === "Mist"){
        imagePath = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_39-64.png"
      }else {
        imagePath = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_2-256.png"
      }
      setData({...data, celcius: res.data.main.temp, name: res.data.name,  humidity: res.data.main.humidity, speed: res.data.wind.speed,
      image: imagePath}
      )
      
   })
    
   .catch(err => {
     if(err.res.status === 404){
      setError('city name is not available')
     }
      console.log(err)
    
    })

  
    
  }}


  return (
   <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
                <button> <MdSearch className='img' onClick={handleClick}/></button>
                
            </div>
            <div className='error'>
              <p>{error}</p>
            </div>
          
          <div className='winfo'>
           <img src={data.image} className='icon'alt='img'/>
            <h1>{Math.round(data.celcius)}°c</h1>
            <h2>{data.name}</h2>
        <div className='details'>
          <div className='col'>
            <img src='https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-5/32/humidity-64.png' alt=''/>
            <div className='humidity'>
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
          </div >
          <div className='col'>
          <img src='https://cdn3.iconfinder.com/data/icons/feather-5/24/wind-64.png' alt=''/>
            <div className='wind'>
              <p>{Math.round(data.speed)}km/h</p>
              <p>wind</p>
            </div>
          </div>
        </div>
          </div>
        </div>
        </div>
    
  )
}

export default Home