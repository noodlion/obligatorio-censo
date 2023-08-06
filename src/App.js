import "./App.css";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import Dashboard from "../src/Componentes/Dashboard";
import ListadoPersonas from "../src/Componentes/ListadoPersonas";
import Login from "../src/Componentes/Login";
import Registro from "../src/Componentes/Registro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../src/Componentes/NotFound";
import Logout from "../src/Componentes/Logout";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
      
    </Provider>
  );
}

export default App;
