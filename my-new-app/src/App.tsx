import { useEffect, useState } from "react"
import { Song} from "./models/Song";
import { Header } from "./components/Header"
import "/Users/antonio/Desktop/WebDevStuff/React/cancionero/my-new-app/bootstrap/css/bootstrap.min.css"
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
    <Header />
    </>
  )
}

export default App  