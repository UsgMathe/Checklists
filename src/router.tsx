import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Navbar from "./components/navbar";

const Teste = () => <div>Sim</div>;

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20" />
      <Routes>
        <Route Component={App} path="/" />
        <Route Component={Teste} path="/perfil" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
