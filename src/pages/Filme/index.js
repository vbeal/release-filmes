import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faStar,
  faExpand,
  faSave,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
            append_to_response: "videos",
          },
        })
        .then((response) => {
          setFilmes(response.data);
          setLoading(false);
          document.title = response.data.title + " - Release Filmes";

          // Obter o trailer do filme
          const trailer = response.data.videos.results.find(
            (video) => video.type === "Trailer"
          );
          setTrailer(
            trailer ? `https://www.youtube.com/embed/${trailer.key}` : ""
          );
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilmes();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@releasefilmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvos) => filmesSalvos.id === filme.id
    );

    if (hasFilme) {
      //alert("Esse filme ja foi salvo");
      toast.error("Esse filme ja foi salvo");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@releasefilmes", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo em Meus Filmes com sucesso");
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"></div>
        <span className="visually-hidden">Carregando filmes...</span>
      </div>
    );
  }

  return (
    <>
      <div className="card mx-auto mt-4" style={{ maxWidth: "940px" }}>
        <div className="row g-0">
          <div className="col-md-4 position-relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              className="img-fluid rounded-start"
              alt={filme.title}
            />
            <button
              className="btn btn-light position-absolute top-0 end-0 m-2"
              title="Ampliar imagem"
              data-bs-toggle="modal"
              data-bs-target="#imagemModal"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title display-5">{filme.title}</h2>
              <p className="card-text fs-5">{filme.overview}</p>
              <p className="card-text">
                <small className="text-muted">
                  <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                  {formatarData(filme.release_date)}
                  <br />
                  <FontAwesomeIcon icon={faStar} /> Avaliação:{" "}
                  {filme.vote_average} / 10
                </small>
              </p>
              <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={salvarFilme}>
                  <FontAwesomeIcon icon={faSave} /> Salvar
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#trailerModal"
                >
                  <FontAwesomeIcon icon={faPlay} /> Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link para voltar a home */}
      <Link to="/" className="btn btn-light mt-4 m-4">
        <i className="fa-solid fa-arrow-left fa-lg m-2"></i> Voltar para Home
      </Link>
      {/* fim link voltar a home */}

      <div
        className="modal fade"
        id="imagemModal"
        tabIndex="-1"
        aria-labelledby="imagemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imagemModalLabel">
                {filme.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                className="img-fluid"
                alt={filme.title}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="trailerModal"
        tabIndex="-1"
        aria-labelledby="trailerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="trailerModalLabel">
                Trailer de {filme.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {trailer ? (
                <iframe
                  width="100%"
                  height="315"
                  src={trailer}
                  title={`Trailer de ${filme.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Trailer não disponível.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filme;
