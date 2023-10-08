import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import useGameStore from "../../store";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const { isLoading } = useGameStore((state) => state);

  return (
    <>
      <div className="container">
        <Header />
        <main className="main-content">{children}</main>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Layout;
