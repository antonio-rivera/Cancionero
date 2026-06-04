import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Song } from "../models/Song";
import SongCard from "./SongCard";
import { Props } from "../../interface";

type genreOutput = { genre: string };
type ITunesSearchResponse = {
  results: {
    artworkUrl100?: string;
  }[];
};

export function BrowseView({ songs }: Props) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<genreOutput[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>(songs ?? []);
  const [fsongs, setFsongs] = useState<Song[]>(songs ?? []);

  useEffect(() => {
    const fetchData = async () => {
      const response: genreOutput[] = await window.DB.getAllGenres();
      setGenres(response);

      if (!songs) {
        setAllSongs([]);
        setFsongs([]);
        return;
      }

      const songsWithArtwork = await Promise.all(
        songs.map(async (song: Song) => {
          if (song.albumArtwork) {
            return song;
          }

          try {
            const term = encodeURIComponent(`${song.artist.trim()} ${song.title.trim()}`);
            const searchUrl = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`;
            const result = await fetch(searchUrl);
            const data: ITunesSearchResponse = await result.json();
            const artworkUrl = data.results[0]?.artworkUrl100;

            return artworkUrl ? { ...song, albumArtwork: artworkUrl } : song;
          } catch (error) {
            console.error(`Could not fetch artwork for ${song.artist} - ${song.title}`, error);
            return song;
          }
        })
      );

      setAllSongs(songsWithArtwork);
      setFsongs(songsWithArtwork);
    };
    fetchData();
  }, [songs]);

  function goToSong(ID: number): void {
    navigate(`/song/${ID}`);
  }

  function filter(genre: string) {
    setFsongs(allSongs.filter(song => song.genre === genre));
  }

  function reset() {
    setFsongs(allSongs);
  }

  return <>
    <div id="filter-bar" className="py-2 bg-dark d-flex flex-wrap align-items-center">
      <span className="h5 text-white px-2">Generos: </span>
      {genres.map(({ genre }, index) =>
        <button onClick={() => filter(genre)} key={index} className="p-1 mx-2 rounded border btn btn-light">{genre}</button>
      )}
      <button onClick={reset} className="p-1 mx-2 rounded border btn btn-warning">Resetear</button>
    </div>

    <div className="mt-4 container-fluid d-flex flex-row flex-wrap justify-content-around align-content-center">
      {fsongs.map(song => <SongCard key={song.ID} song={song} goToSong={goToSong} />)}
    </div>
  </>

}
