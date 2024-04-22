import { useState } from "react";
import { Song } from "../models/Song";
import { searchUtilsModule } from "../utils/searchUtils";

type Props =
  {
    songs: Array<Song>
  }

export function SearchForm({ songs }: Props) {
  const [query, setQuery] = useState<string>("")
  let searchResults;
  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
    if (query) {
      searchResults = searchUtilsModule.matchResults(query, songs)
    }

  }

  return (
    <form className="my-5 text-center" id="search-form">
      <h3 className="pb-2">Busqueda</h3>
      <input placeholder="Busca aqui la informacion de la cancion..." className="form-control w-75 mx-auto" type="search" name="search"
        id="search" value={query} onChange={(event => setQuery(event.target.value))} />
      <button className="btn btn-primary mt-3" id="search-button" type="submit" onClick={(event) => handleSubmit(event)}>Buscar</button>
    </form>
  )
}