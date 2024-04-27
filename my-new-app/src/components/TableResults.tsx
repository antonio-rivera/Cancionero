import { Song } from "../models/Song"

type Props =
  {
    results: Array<Song>;
    haveResults: boolean;
  }

export function TableResults({ haveResults, results }: Props) {
  if (haveResults) {
    return (
      <table className="table w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Artista</th>
            <th scope="col">Genero</th>
          </tr>
          {results.map(song =>
            <tr key={song.ID}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
            </tr>
          )}
        </thead>
        <tbody>

        </tbody>
      </table>
    )

  }
}