export function SearchForm()
{
  return (
    <form className="my-5 text-center" id="search-form">
      <h3 className="pb-2">Busqueda</h3>
      <input placeholder="Busca aqui la informacion de la cancion..." className="form-control" type="search" name="search"
        id="search" />
      <button className="btn btn-primary mt-3" id="search-button" type="submit">Buscar</button>
    </form>
  )
}