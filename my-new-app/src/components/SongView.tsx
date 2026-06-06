import { Props } from "../../interface"
import { useParams } from "react-router-dom"
import { ScrollerControls } from "./ScrollerControls";
import { useState } from "react";
export function SongView({ songs }: Props) {

  const { id } = useParams()
  const [lyricsSize, setLyricsSize] = useState(2.5)

  function changeLyricsSize(buttonPressed: string) {
    if (buttonPressed === "Up") {
      setLyricsSize(prevLyricsSize => prevLyricsSize + 0.1)
    }
    else {
      setLyricsSize(prevLyricsSize => prevLyricsSize - 0.1)
    }
  }

  if (songs) {
    const currentSong = songs.find(song => song.ID === Number(id))

    if (currentSong) {
      const { title, artist, lyrics } = currentSong;
      return <>
        <div className="my-4 pb-5 container-fluid">
          <h1 className="text-center">{title}</h1>
          <h3 className="text-center">{artist}</h3>
          <p id="p-lyrics" style={{ "fontSize": lyricsSize.toString() + "rem" }} className="pt-2 pb-5 text-center">
            {lyrics}
          </p>
          <hr />
          <p className="text-center text-muted h5 p-3">Fin</p>
        </div>
        <ScrollerControls changeLyricsSize={changeLyricsSize} id={id} />

      </>

    }

  }
}