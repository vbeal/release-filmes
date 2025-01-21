function Erro() {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <img
            src="https://i.imgur.com/qIufhof.png"
            alt="404 Error"
            className="img-fluid mb-4"
          />
          <h1 className="display-4">404</h1>
          <p className="lead">Página não encontrada</p>
          <p>
            Opa! Parece que você tentou acessar uma página que não existe.
            Verifique o endereço ou volte para a página inicial.
          </p>
          <a href="/" className="btn btn-dark mt-3">
            Voltar para Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Erro;
