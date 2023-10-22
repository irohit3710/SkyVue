import React, { useState } from 'react'
import search from '../../assets/search.png';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [data,setData] = useState([]);//to store api data 
  const [iconCode,setIconCode] = useState("10d");

  //function for popup message when entered city name is invalid
  function errornotify(){
    toast.error("City name is invalid")
  }

  //function for warning that city name is not entered and trying to search empty string
  function emptynotify(){
    toast.warn("Enter city name.(Default is Delhi)")
  }
  //Function to get data when no input is provided
  async function initialDetails (){
    const api = '0026f2bd2bcfc5b8063fa842fb585358';
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${api}`)
    res = await res.json();
    setIconCode(res?.weather?.[0]?.icon);
    setData(res);
  }

  //initially data is shown as per delhi location 
  useState(async ()=>{
    initialDetails();
  },[])

  //to search about user input query 
  const searchData = async () =>{
    const element = document.getElementById("city_name")
    if(element.value===""){
      emptynotify();
      initialDetails();
      return 0;
    }
    const api = '0026f2bd2bcfc5b8063fa842fb585358';
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${api}`)
    let res = await result.json();
    setData(res);
  
    if(result.ok === false){
      errornotify();
      initialDetails();
      return 0;
    }

    const val = res?.weather?.[0]?.icon;
    setIconCode(val);
  }

  //Convert epoch time to standard time 
  function convertMsToTime(milliseconds) {
    var d = new Date(0);
    d.setUTCSeconds(milliseconds);
    return `${d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()}`;
  }

  //Used to Convert Kelvin to Celsius 
  function convertFarenheitToCelsius(temp){
       let celsius = temp - 273.15;
    return celsius.toPrecision(4);
  }

  //User Enter Location Name and press enter key and charCode 13 is code of "Enter" key
  function handleKeyPress(e) {
    if (e.charCode === 13) {
        searchData();
    }
  }

  //Function to convert m/sec to km/hrs
  function msecToKmHrs(value){
    const data = value * 3.6;
    return data.toPrecision(4);
  }

  return (
      <div className='flex flex-col items-center gap-3'>
        <motion.h3 className='relative p-0 m-0 font-light text-5xl text-[#080808] text-center uppercase pb-[5px] before:w-[28px] before:h-[5px] before:block before:"" before:absolute before:bottom-[3px] before:left-[50%] before:ml-[-14px] before:bg-[#b80000] after:w-[100px] after:h-[1px] after:block after:"" after:relative after:mt-[25px] after:left-[50%] after:ml-[-50px] after:bg-[#b80000]' style={{WebkitTransition:'all 0.4s ease 0s',OTransition:'all 0.4s ease 0s',transition:'all 0.4s ease 0s'}}
          initial={{opacity:0,scale:0.5}}
          animate={{opacity:1,scale:1}}
          transition={{transition:0.5,delay:0.3}}
        >
          SkyVue
        </motion.h3>
        <motion.div className=' md:w-1/2 bg-black bg-opacity-90 mx-auto h-full rounded-2xl sm:w-full sm:mt-0 hover:shadow-2xl duration-300'
          initial={{opacity:0,scale:0.5}}
          animate={{opacity:1,scale:1}}
          transition={{transition:0.5,delay:0.3}}
        >
          <div className=' pt-5 px-auto flex items-center justify-center gap-6'>
            <input type="text" name="" id="city_name" placeholder='Enter City Name' className=' h-14 w-1/2 rounded-full px-5 font-semibold outline-red-500' onKeyPress={handleKeyPress}/>
            <button className=' h-14 w-14 bg-white rounded-full flex justify-center items-center'><img src={search} alt="Search" onClick={searchData}/></button>
          </div>
          <div className=' flex flex-col items-center justify-center mt-10 mb-3'>
            <img width="150" height="150" src={`https://openweathermap.org/img/w/${iconCode}.png`} alt="partly-cloudy-day" className=' rounded-full'/>
            <p className=' text-6xl text-white font-semibold'>{convertFarenheitToCelsius(data?.main?.temp)}°c</p>
            <p className=' text-base text-white pt-2'>{data?.name}</p>
          </div>
          <div className=' grid md:grid-cols-2 text-center text-white gap-5 pb-5 sm:grid-cols-1 justify-center px-10 '>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/thermometer-down.png" alt="thermometer-down"/>
              <p>Min Temp. :{convertFarenheitToCelsius(data?.main?.temp_min)} °c</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/thermometer-up.png" alt="thermometer-up"/>
              <p>Max Temp. : {convertFarenheitToCelsius(data?.main?.temp_max)} °c</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/000000/thermometer.png" alt="thermometer"/>
              <p>Original Feel : {convertFarenheitToCelsius(data?.main?.feels_like)} °c</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
            <img width="30" height="30" src="https://img.icons8.com/fluency/48/atmospheric-pressure.png" alt="atmospheric-pressure"/>
              <p>Pressure : {data?.main?.pressure} mbar</p>  
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/moisture.png" alt="moisture"/>
              <p>Humidity : {data?.main?.humidity}%</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/wind-speed-less-1.png" alt="wind-speed-less-1"/>
              <p>Visibility : {data?.visibility / 1000} Km</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/wind.png" alt="wind"/>
              <p>Wind Speed : {msecToKmHrs(data?.wind?.speed)} Km/Hrs</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/wind-speed-103-107.png" alt="wind-speed-103-107"/> 
              <p>Wind Direction : {data?.wind?.deg} °N</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/sunrise.png" alt="sunrise"/>
              <p>Sunrise : {convertMsToTime(data?.sys?.sunrise)}</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/sunset.png" alt="sunset"/>
              <p>Sunset : {convertMsToTime(data?.sys?.sunset)}</p>
            </div>
          </div>
        </motion.div>
        <ToastContainer
          position='top-left'
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
  )
}

export default Home