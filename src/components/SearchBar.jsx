import { useState } from "react"


export default function SearchBar({onSubmitClick}){
       const [text,setText] = useState('')
       return(<>
                <div className="p-[2%] md:p-[1%]  flex flex-row justify-center items-center relative ">
                        <form
                            className={(open? 'w-[70%]  opacity-[100%]  ':'w-[0%]  ')+" h-[100%]  md:p-[1%] md:w-[40%] mr-[2%]  transition-all flex flex-row duration-200 rounded-md  bg-opacity-50 text-white outline-none"}
                            onSubmit={(e)=>{
                            e.preventDefault()
                            onSubmitClick(text)}} action="">
                                <div className={" w-[100%] transition-all flex flex-row bg-gray-600 bg-opacity-50    duration-200 rounded-md   text-white outline-none"}>
                                    <input className=" w-[90%] rounded-l-md p-[2%]   md:p-[0%] md:px-[2%]  bg-transparent outline-none"  type="text" value={text} onChange={(e)=> setText(e.target.value)}  name="" id="" />
                                    <button disabled={!open} className={(open ? '':'opacity-[0%]')+"  pr-[2%] md:pr-[0%] bg-opacity-50 flex flex-row items-center justify-end  md:opacity-[100%] transition-all duration-200 w-[10%] bg-transparent"} type="submit">
                                        <ion-icon class=' p-[10%]  md:p-[10%] text-[150%] w-full  rounded-r-md' name="search-outline"></ion-icon>
                                    </button>
                                </div>    
                        </form>

                </div>
       </>)
}
// from mobile