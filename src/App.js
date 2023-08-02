import "./App.css";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import Dashboard from "../src/Componentes/Dashboard";
import ListadoPersonas from "../src/Componentes/ListadoPersonas";
import Login from "../src/Componentes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
