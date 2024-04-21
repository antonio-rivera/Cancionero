import { useEffect, useState } from "react"
import { Song} from "./models/Song";

 function App() {
  const [data, setData] = useState<Array<Song>>(null); 

   useEffect( () => {
    const fetchData = async () => {
      const response: Array<Song> = await window.DB.getAllData()
      setData(response)
    }
   fetchData() 
   }, [])

  return (
    <>
    <h1>Hello from React</h1>
    </>
  )
}

export default App  