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
  const [searchResults, setSearchResults] = useState<Song[]>()
  const [haveResults, setHaveResults] = useState<boolean>(false)
  const [foundText, setNotFoundText] = useState(null)

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
    if (query) {
      let results = searchUtilsModule.matchResults(query, songs)
      setSearchResults(results);
      setHaveResults(results?.length > 0);
      if (results?.length === 0) {
        setNotFoundText(<h3 className="text-center mb-5 text-muted">No se encontro la cancion que busco. Trate de nuevo</h3>);
      }

      else {
        setNotFoundText(null)
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
      {foundText}
    </>

  )

}