import { Song } from "../models/Song"

type Props =
  {
    results: Array<Song>;
    haveResults: boolean;
  }

export function TableResults({ haveResults, results }: Props) {
  // TODO: Render results array table as a map 
  //       function with the data. 
  // TODO: Resize table
  if (haveResults) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Artista</th>
            <th scope="col">Genero</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    )

  }
}