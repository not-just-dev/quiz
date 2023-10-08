import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="main-header">
      <h1 className="main-header__title">Preguntas de entrevista</h1>
      <img
        className="main-header__logo"
        src="/logo.png"
        alt="!JustDev logo"
        width="180"
        height="30"
      />
    </header>
  );
};

export default Header;
