import { useState } from 'react'
import SearchBar from './components/SearchBar'
import Data from './components/Data'

export default function App(){

    const [searchq,setSearchq] = useState("paris")
    const handleSubmitClick = (text)=>{
          setSearchq(text)
    }

    return(<>
            <div >
                <Data searchq={searchq}><SearchBar onSubmitClick={handleSubmitClick}/></Data>
            </div>    
            </>)
}