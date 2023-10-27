import { useState,useEffect } from "react"
import axios from "axios"


export default function Data({searchq,children}){
    
    const [data,setData] = useState(null)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [isDay,setIsDay] = useState(false)


    useEffect(()=>{
    
        if(loading)
           return 

        let ignore = false
        const getData  = async()=>{
        try{

        if(searchq.length===0)
           return 
         
        setLoading(true)
        const resp = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${searchq}&&key=460faaaea40f4f46bde155441230907`)
        setLoading(false)
        setError(false)
     
        if(ignore){
           return
        }
    
        setData(resp.data)
        setIsDay(resp.data.current.is_day)

       }catch(err){

        setLoading(false)
        setError(err.response.data.error.message)

       }
       }

        getData()
     
        return()=>{
        
            ignore = true
       
        }

    },[searchq])

    return(<>
          <div className=' font-nunito min-h-screen flex flex-col relative'>
            <div style={{backgroundImage: `url('https://cdn.dribbble.com/users/780072/screenshots/2227157/attachments/414101/Sun.png')`}} className={ (isDay?'opacity-[100%]':'opactiy-[0%]')+" md:opacity-[0%]  transition-all duration-400 z-[-1] bg-no-repeat bg-cover bg-center absolute w-full h-full"}></div>
            <div style={{backgroundImage: `url('https://cdn.dribbble.com/users/780072/screenshots/2227157/attachments/414100/Moon.png')`}} className={ (isDay?'opacity-[0%]':'opactiy-[100%]')+" md:opacity-[0%] transition-all duration-400 z-[-1] bg-no-repeat bg-cover bg-center absolute w-full h-full"}></div>
            <div style={{backgroundImage: `url('https://www.wallpapertip.com/wmimgs/81-810819_vector-background-for-website.jpg')`}} className={ (isDay?'opacity-[0%]':'opacity-[0%] md:opacity-[100%]')+"  transition-all duration-400 z-[-1] bg-no-repeat bg-cover bg-center absolute w-full h-full"}></div>
            <div style={{backgroundImage: `url('https://wallpaperaccess.com/full/1548929.jpg')`}} className={ (isDay?'opacity-[0%] md:opacity-[100%]':'opacity-[0%] ')+"  transition-all duration-400 z-[-1] bg-no-repeat bg-cover bg-center absolute w-full h-full"}></div>
           
            
            {children}
            {error?(<>
            <div className="flex place-items-center justify-center text-white text-[150%] mt-[10%]">{error}</div>
            </>):(<>
            { loading ? (<>
            <div className="flex justify-center items-center text-[200%] text-white mt-[20%] md:mt-[0%]">
                     {loading}loading
            </div>
            </>) : (<>
           { data? <div className="flex text-center flex-col justify-center flex-grow w-[100%]  pt-[20%] md:pt-[0%] items-center">
                 <div className="text-white flex flex-col flex-grow items-center  mb-[20%] md:mb-[5%]" htmlFor="">
                    <div className="text-[280%]">{data.location.name}</div>
                    <div className="flex flex-row capitalize"><label>{days[new Date().getDay()]}</label> <label className="ml-[5%]" htmlFor="">{getHours(data.location.localtime)}</label></div>
                 </div>
                 <div className="flex  w-full flex-col items-center justify-center">
                
                 <label className=" text-[250%] text-white" htmlFor="">{data ? ( data.current? (data.current.feelslike_c?data.current.feelslike_c:''):''):''}°C</label>
                 <label className="w-[5%] mt-[1%] border-b-2 border-white" htmlFor=""></label>

                  <div className="flex flex-row text-[150%] text-white items-start justify-center mt-[20%] md:mt-[10%] mb-[5%]  w-full ">

                      <div className="flex px-[5%] border-r-2 border-white flex-col items-center justify-center">
                      <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg>                        <div>{data ? ( data.current? (data.current.temp_c?data.current.temp_c:''):''):''}°</div>
                     </div>
                     <div className="flex px-[5%] flex-col text-white items-center justify-center">
                     <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"/></svg>
                     <div>{data ? ( data.current? (data.current.wind_mph?data.current.wind_mph:''):''):''}mph</div>
                     </div>
                      
                  </div>

                 </div>
            </div>:''}
            </>)}
           
            </>)}
            
          </div>
          </>)
}


console.log(new Date().getDay())
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const getHours = (h)=>{
   let time = ''
    h = h.split(' ')
    h = h[1]
    h = h.split(':')
    if(parseInt(h[0])>12)
       time = parseInt(h[0])%12+':'+h[1]+'pm'
    else
       time = parseInt(h[0])+':'+h[1]+'am'
   
    return time

}