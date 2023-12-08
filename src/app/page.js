'use client'
import Image from 'next/image'
import { useState } from 'react';
import { CiCloudOn } from "react-icons/ci";

export default function Home() {
  const [datum, setDatum]=useState({})
  const [formData,setFormData]=useState({
    location : ''
  })
  
  const handleChange =(e)=>{
    const{name,value}=e.target
    setFormData((previousData)=>{
      return{
        ...previousData,
        [name]:value
      }
    })
  }
  
  const handleSearch = async (e)=>{
    e.preventDefault()
    const {location} = formData
    const api_key = 'd87dba1411494061b8632600230712'
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`
    const res = await fetch(api_url)
    const data = await res.json()
    setDatum(data)
    console.log(data)
  }
  return (
    <div className='h-screen mt-2 md:m-5 md:flex md:flex-row md:gap-5'>
      <div className='bg-[#7c67f5] md:w-3/12 w-full rounded-2xl text-sm text-center text-white p-5'>
        <h3 className='text-2xl font-bold mt-10 mb-4'>WEATHER APP</h3>
        <p>get the current weather details of any location</p>
        <CiCloudOn  className='w-48 h-48 m-auto border-1 border-white'/> 
        <form>
          <input type='text' placeholder='Type Location' className='w-full h-10 pl-4 text-black border-1 border-[#7c67f5] rounded-md mb-5'name='location' value={formData.location} onChange={handleChange}/>
          <button onClick={handleSearch} className='w-full h-10 border-2 border-white rounded-md'>Search</button>
        </form>
            <h4 className='mt-6 mb-3'>Temperature Ranges</h4>
        <div className='w-full flex text-[0.7rem] justify-between'>
        <div>
            <p>Raining</p>
            <p>0°C - 10°C</p>
          </div>
          <div>
            <p>SunShine</p>
            <p>Greater than 10°C</p>
          </div>
          <div>
            <p>Cold or Snow</p>
            <p>Less than 0°C</p>
          </div>
        </div>
      </div>
      <div className='md:w-9/12 w-full rounded-2xl text-center'>
        <div className='flex flex-row justify-between mb-4 mt-5 md:mt-0'>
          <h3 className='text-[0.7rem] text-[#7c67f5]'>Last updated : <br/> {datum?.current?.last_updated}</h3>
          <h3 className='text-xl text-[#7c67f5] font-bold'>CURRENT</h3>
          <h3 className='text-[0.7rem] text-[#7c67f5]'>Last updated epoch :<br/> {datum?.current?.last_updated_epoch}</h3>
        </div>
        <div className='w-full md:flex md:gap-5 gap-2 md:flex-row justify-between'>
          <div className='w-full mb-3 md:h-44 h-36 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-sm'>Wind Degree</h3>
            <h3 className='font-bold text-xl'>{datum?.current?.wind_degree}</h3>
            <h3 className='text-[0.7rem] mt-2'>Wind Direction</h3>
            <h3 className='font-bold text-[0.7rem]'>{datum?.current?.wind_dir}</h3>
          </div>
          <div className='w-full mb-3 h-36 md:h-44 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-sm'>Temperature C</h3>
            <h3 className='font-bold text-xl'>{datum?.current?.temp_c}</h3>
            <h3 className='text-[0.7rem] mt-2'>Temperature F</h3>
            <h3 className='font-bold text-[0.7rem]'>{datum?.current?.temp_f}</h3>
          </div>
          <div className='w-full md:h-44 h-36 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-[0.9rem]'>Wind KPH</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.wind_kph}</h3>
            <h3 className='text-[0.9rem]'>Wind MPH</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.wind_mph}</h3>
          </div>
        </div>

        <div className='w-full grid grid-cols-2 md:flex md:gap-5 gap-3 mt-5 md:flex-row justify-between'>
          <div className='cards w-full md:h-44 h-32 text-[#7c67f5] flex flex-col justify-center rounded-md'>
            <h3 className='text-[0.9rem]'>Feelslike C</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.feelslike_c}</h3>
            <h3 className='text-[0.9rem]'>Feelslike F</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.feelslike_f}</h3>
          </div>
          <div className='cards w-full md:h-44 h-32 text-[#7c67f5] flex flex-col justify-center rounded-md'>
            <h3 className='text-[0.9rem]'>Gust KPH</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.gust_kph}</h3>
            <h3 className='text-[0.9rem]'>Gust MPH</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.gust_mph}</h3>
          </div>
          <div className='cards w-full md:h-44 h-32 text-[#7c67f5] flex flex-col justify-center rounded-md'>
            <h3 className='text-[0.9rem] mb-0'>{datum?.current?.condition?.text}</h3>
            {datum?.current?.condition?.icon?<img src={`https:${datum?.current?.condition?.icon}`} className='md:w-32 w-20 h-20 md:h-32 m-auto' />:''}
            <h3 className='text-[0.9rem]'>Cloud : {datum?.current?.cloud}</h3>
          </div>
          <div className='cards w-full md:h-44 h-32 text-[#7c67f5] flex flex-col justify-center rounded-md'>
            <h3 className='text-[0.9rem]'>Pressure In</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.pressure_in}</h3>
            <h3 className='text-[0.9rem]'>Pressure MB</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.current?.pressure_mb}</h3>
          </div>
        </div>
        <div className='w-full md:flex md:gap-5 gap-2 md:flex-row justify-between mt-5'>
          <div className='w-full md:h-44 h-36 mb-3 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-sm'>Country</h3>
            <h3 className='font-bold text-xl'>{datum?.location?.country}</h3>
            <h3 className='text-[0.7rem] mt-2'>Tz ID</h3>
            <h3 className='font-bold text-[0.7rem]'>{datum?.location?.tz_id}</h3>
          </div>
          <div className='w-full md:h-44 h-36 mb-3 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-sm'>Latitude</h3>
            <h3 className='font-bold text-xl'>{datum?.location?.lat}</h3>
            <h3 className='text-[0.7rem] mt-2'>Longitude</h3>
            <h3 className='font-bold text-[0.7rem]'>{datum?.location?.lon}</h3>
          </div>
          <div className='w-full md:h-44 h-36 mb-3 text-white flex flex-col justify-center bg-[#7c67f5] rounded-md'>
            <h3 className='text-[0.9rem]'>Name</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.location?.name}</h3>
            <h3 className='text-[0.9rem]'>Region</h3>
            <h3 className='font-bold text-[0.9rem]'>{datum?.location?.region}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
