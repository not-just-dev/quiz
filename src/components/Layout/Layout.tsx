import { PropsWithChildren } from "react";
import Header from "../Header/Header";

const Layout = ({ children }: PropsWithChildren): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
