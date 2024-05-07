import { Props } from "../../interface"
import { useParams } from "react-router-dom"
import { ScrollerControls } from "./ScrollerControls";
export function SongView({ songs }: Props) {

  const { id } = useParams()

  if (songs) {
    const currentSong = songs.find(song => song.ID === Number(id))

    if (currentSong) {
      const { title, artist, lyrics } = currentSong;
      return <>
        <div className="mt-4 container-fluid">
          <h1 className="text-center">{title}</h1>
          <h3 className="text-center">{artist}</h3>
          <p className="pt-2 pb-5 text-center">
            {lyrics}
          </p>
        </div>
        <ScrollerControls id={id} />
      </>

    }

  }
}