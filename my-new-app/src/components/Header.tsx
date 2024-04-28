import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light btn-primary">
      <div className="navbar-nav">
        <Link to={"/"} className="mx-2 h4 nav-item nav-link text-white">Buscar</Link>
        <a className="mx-2 h4 nav-item nav-link text-white" href="#">Explorar</a>
        <a className="mx-2 h4 nav-item nav-link text-white" href="#">Añadir</a>
      </div>
    </nav>
  )
}