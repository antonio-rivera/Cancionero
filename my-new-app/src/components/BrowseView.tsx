import { useNavigate } from "react-router-dom";
import { Props } from "../../interface";
import { useEffect, useState } from "react";
import { Song } from "../models/Song";

type genreOutput = { genre: string }

export function BrowseView({ songs }: Props) {
  const [genres, setGenres] = useState<genreOutput[]>([]);
  const [fsongs, setFsongs] = useState<Song[]>(songs);

  useEffect(() => {
    const fetchData = async () => {
      const response: genreOutput[] = await window.DB.getAllGenres()
      setGenres(response)
    }
    fetchData()
  }, [])

  const navigate = useNavigate();
  function goToSong(ID: number): void {
    navigate(`/song/${ID}`)
  }

  function filter(genre: string) {
    if (songs) {
      setFsongs(songs.filter(song => song.genre === genre));
    }
  }

  function reset() {
    if (songs) {
      setFsongs(songs);
    }
  }

  return <>
    <div id="filter-bar" className="py-2 bg-primary d-flex flex-wrap align-items-center">
      <span className="h5 text-white px-2">Generos: </span>
      {genres.map(({ genre }, index) =>
        <button onClick={() => filter(genre)} key={index} className="p-1 mx-2 rounded border btn btn-light">{genre}</button>
      )}
      <button onClick={reset} className="p-1 mx-2 rounded border btn btn-warning">Resetear</button>
    </div>

    <div className="mt-4 container-fluid d-flex flex-row flex-wrap justify-content-around align-content-center">
      {fsongs ? fsongs.map(song =>
        <div key={song.ID} onClick={() => goToSong(song.ID)} id="song-card" className="d-flex justify-content-center flex-column rounded p-2 m-2">
          <div id="song-card-title" className="text-center py-2">{song.title}</div>
          <div className="text-center text-muted">{song.artist}</div>
          <div className="text-center text-muted pt-2">{song.genre}</div>
        </div>
      ) : null}
    </div>
  </>

}