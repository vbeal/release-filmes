import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Definindo o título
    document.title = "Home - Release Filmes";

    // Carregando os filmes
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: process.env.REACT_APP_API_KEY, // Chave de acesso .env
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando filmes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-center mt-3">
      <div className="row">
        {filmes.map((filme) => {
          return (
            <div className="col">
              <div
                className="card mb-3"
                style={{ width: "18rem" }}
                key={filme.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  className="card-img-top"
                  alt="..."
                ></img>
                <div className="card-header" style={{ height: "70px" }}>
                  <h5 className="card-title ">{filme.title}</h5>
                </div>
                <div className="card-body">
                  <Link
                    to={`/filme/${filme.id}`}
                    className="btn btn-dark w-100 align-self-end"
                  >
                    Detalhes do Filme
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
