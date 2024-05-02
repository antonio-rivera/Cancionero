import { useNavigate } from "react-router-dom";
import { Props } from "../../interface";
import { useEffect, useState } from "react";

export function BrowseView({ songs }: Props) {
  const [genres, setGenres] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response: string[] = await window.DB.getAllGenres()
      console.log(response);
      setGenres(response)
    }
    fetchData()
  }, [])

  const navigate = useNavigate();
  function goToSong(ID: number): void {
    navigate(`/song/${ID}`)
  }

  return <>
    <div className="container-fluid d-flex flex-row flex-wrap justify-content-around align-content-center">
      {songs.map(song =>
        <div key={song.ID} onClick={() => goToSong(song.ID)} id="song-card" className="d-flex justify-content-center flex-column rounded p-2 m-2">
          <div id="song-card-title" className="text-center py-2">{song.title}</div>
          <div className="text-center text-muted">{song.artist}</div>
          <div className="text-center text-muted pt-2">{song.genre}</div>
        </div>
      )}
    </div>
  </>

}