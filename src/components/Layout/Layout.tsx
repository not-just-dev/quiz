import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import useGameStore from "../../store";
import QuizTitle from "../QuizTitle/QuizTitle";
import Footer from "../Footer/Footer";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  const { isLoading } = useGameStore((state) => state);

  return (
    <>
      <div className="container">
        <Header />
        <QuizTitle />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
      {isLoading && <Loading />}
    </>
  );
};

export default Layout;
