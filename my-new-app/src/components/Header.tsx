import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="navbar-nav">
        <Link to={"/"} className="mx-2 h4 nav-item nav-link text-white">Buscar</Link>
        <Link to={"/browse"} className="mx-2 h4 nav-item nav-link text-white">Explorar</Link>
        <a className="mx-2 h4 nav-item nav-link text-white" href="#">Añadir</a>
      </div>
    </nav>
  )
}