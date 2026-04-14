import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx"
import Home from "./pages/homepage/Home";
import Cadastro from "./pages/user/Cadastro.jsx";
import Login from "./pages/user/Login.jsx";
import FormularioPedido from "./pages/Pedidos/FormularioPedido.jsx";
import MeusPedidos from "./pages/Pedidos/MeusPedidos.jsx";

//icones importados de https://react-icons.github.io/react-icons/ em cada componente segregado
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pedido/:carId" element={<MeusPedidos />} />
        <Route path="/MeusPedidos" element={<MeusPedidos />} />
      </Routes>
    </>
  )
}

export default App
