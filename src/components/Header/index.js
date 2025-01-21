import { Link } from "react-router-dom";

function Header() {
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <i class="fa-solid fa-film fa-lg m-2"></i>RELEASE FILMES
        </Link>
        <Link to="/favoritos" className="btn btn-light d-flex">
          Meus Filmes
        </Link>
      </div>
    </nav>
  );
}

export default Header;
