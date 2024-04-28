import { Props } from "../../interface"
import { useParams } from "react-router-dom"
export function SongView({ songs }: Props) {
  const { id } = useParams()
  if (songs) {
    const currentSong = songs.find(song => song.ID === Number(id))
    if (currentSong) {
      const { title, artist, lyrics } = currentSong;
      return <>
        <div className="card">
          <div className="card-body">
            <h1 className="text-center card-title">{title}</h1>
            <h3 className="card-subtitle text-center">{artist}</h3>
            <div className="container">
              <p className="pt-5 card-text text-center">
                {lyrics}
              </p>
            </div>
          </div>
        </div>
      </>

    }

  }
}