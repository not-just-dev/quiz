import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="main-header">
      <h1 className="main-header__title">Entrevisteitor</h1>
      <a
        href="https://discord.gg/wXK8dsGx8b"
        target="_blank"
        rel="noreferrer"
        title="Únete a nuestra comunidad !JustDev"
        aria-label="Únete a nuestra comunidad !JustDev"
      >
        <img
          className="main-header__logo"
          src="/logo.png"
          alt="!JustDev logo"
          width="180"
          height="30"
        />
      </a>
    </header>
  );
};

export default Header;
