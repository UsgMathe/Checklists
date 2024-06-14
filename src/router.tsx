import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './components/navbar';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20" />
      <Routes>
        <Route Component={App} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
