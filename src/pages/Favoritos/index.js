import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Definindo o título
    document.title = "Release Filmes - Meus Filmes Favoritos";
    const minhaLista = localStorage.getItem("@releasefilmes");
    setFilmes(JSON.parse(minhaLista) || []);
    setLoading(false);
  }, []);

  // Exibindo carregando...
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"></div>
        <span className="visually-hidden">Carregando filmes...</span>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Minha Lista de Filmes</h1>

      {filmes.length === 0 ? (
        <span className="alert alert-danger mt-4 d-block">
          <h4 className="alert-heading">
            <b>Você não tem nenhum filme salvo :</b>(
          </h4>
          Clique Detalhes no filme e depois no botão Salvar para adicionar a sua
          lista de filmes.
        </span>
      ) : (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Capa</th>
              <th scope="col">Título</th>
              <th scope="col" className="text-center">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row" className="align-middle" width={40}>
                    {item.id}
                  </th>
                  <td className="align-middle" width={100}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      alt={item.title}
                      width="50"
                      className="img-thumbnail"
                    />
                  </td>
                  <td className="align-middle">
                    <strong>{item.title}</strong>
                  </td>
                  <td className="align-middle text-left" width={160}>
                    <Link
                      to={`/filme/${item.id}`}
                      className="btn btn-primary m-2"
                    >
                      <i className="fa-solid fa-eye fa-lg"></i>
                    </Link>
                    <button
                      onClick={() => excluirFilme(item.id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash fa-lg"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Link to="/">
        <i className="fa-solid fa-arrow-left fa-lg m-2"></i> Voltar para Home
      </Link>
    </div>
  );

  // Função para excluir o filme
  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    // Atualizando o estado
    setFilmes(filtroFilmes);
    localStorage.setItem("@releasefilmes", JSON.stringify(filtroFilmes));
    //alert("Filme removido com sucesso");
    toast.success("Filme removido com sucesso");
  }
}

export default Favoritos;
