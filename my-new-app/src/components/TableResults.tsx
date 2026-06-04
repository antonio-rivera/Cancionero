import { Link } from "react-router-dom";
import { Song } from "../models/Song"
import { useNavigate } from "react-router-dom";
type Props =
  {
    results: Array<Song>;
    haveResults: boolean;
  }

export function TableResults({ haveResults, results }: Props) {
  const navigate = useNavigate();
  if (haveResults) {
    return (
      <table className="table table-hover w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Artista</th>
            <th scope="col">Genero</th>
          </tr>
        </thead>
        <tbody>
          {results.map(song =>
            <tr onClick={() => navigate(`song/${song.ID}`)} key={song.ID}>
              <td className="link-dark">
                {song.title}
              </td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
            </tr>
          )}
        </tbody>
      </table>
    )

  }
}