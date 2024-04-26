import { useState } from "react";
import { Song } from "../models/Song";
import { searchUtilsModule } from "../utils/searchUtils";
import { TableResults } from "./TableResults";

type Props =
  {
    songs: Array<Song>
  }

export function SearchForm({ songs }: Props) {

  const [query, setQuery] = useState<string>("")
  let searchResults: Array<Song>;
  const [haveResults, setHaveResults] = useState<boolean>(false)
  // TODO: Store notFoundText as state so that it renders on change
  let notFoundText = null;

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
    if (query) {
      searchResults = searchUtilsModule.matchResults(query, songs)
      setHaveResults(searchResults?.length > 0);
      if (searchResults?.length === 0) {

        notFoundText = <h3 className="text-center mb-5 text-muted">No se encontro la cancion que busco. Trate de nuevo</h3>;
      }
    }

  }

  return (
    <><form className="my-5 text-center" id="search-form">
      <h3 className="pb-2">Busqueda</h3>
      <input placeholder="Busca aqui la informacion de la cancion..." className="form-control w-75 mx-auto" type="search" name="search"
        id="search" value={query} onChange={(event => setQuery(event.target.value))} />
      <button className="btn btn-primary mt-3" id="search-button" type="submit" onClick={(event) => handleSubmit(event)}>Buscar</button>
    </form>
      <TableResults haveResults={haveResults} results={searchResults} />
      {notFoundText}
    </>

  )

}