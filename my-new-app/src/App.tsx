import { useEffect, useState } from "react"
import { Song } from "./models/Song";
import { Header } from "./components/Header"
import "../bootstrap/css/bootstrap.min.css"
import { SearchForm } from "./components/SearchForm";
import { Route, Routes } from "react-router-dom";
import { SongView } from "./components/SongView";
import { BrowseView } from "./components/BrowseView";
import { AddSong } from "./components/AddSong";
import { EditSong } from "./components/EditSong";
function App() {
  const [data, setData] = useState<Array<Song>>(null);

  async function updateData() {
    const response: Array<Song> = await window.DB.getAllData()
    setData(response)
  }

  useEffect(() => {
    updateData();
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchForm songs={data} />} />
        <Route path="/song/:id" element={<SongView songs={data} />} />
        <Route path="/browse" element={<BrowseView songs={data} />} />
        <Route path="/add" element={<AddSong updateData={updateData} />} />
        <Route path="/edit/:id" element={<EditSong updateData={updateData} songs={data} />} />
      </Routes>
    </>
  )
}

export default App  