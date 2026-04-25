import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header.jsx"
import Home from "./pages/homepage/Home";
import Cadastro from "./pages/user/Cadastro.jsx";
import Login from "./pages/user/Login.jsx";
import FormularioPedido from "./pages/Pedidos/FormularioPedido.jsx";
import MeusPedidos from "./pages/Pedidos/MeusPedidos.jsx";
import Catalogo from "./pages/Catalogo/CatalagoPage.jsx";
import Perfil from "./pages/user/Perfil.jsx"
import FormularioPedidos from "./pages/Pedidos/FormularioPedido.jsx";
import MeusCarros from "./pages/CarrosAgentes/CarrosAgente.jsx";
import CadastroCarro  from "./pages/CarrosAgentes/CadastroCarro.jsx";
import GerenciarPedidos  from "./pages/GerenciarPedidos/GerenciarPedidos.jsx";



//icones importados de https://react-icons.github.io/react-icons/ em cada componente segregado
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/MeusPedidos" element={<MeusPedidos />} />
        <Route path="/pedido/:carId" element={<FormularioPedidos />} />
        <Route path="/Catalogo" element={<Catalogo />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/carros" element={<MeusCarros />} />
        <Route path="/cadastro-carro" element={<CadastroCarro />} />
        <Route path="/gerenciar-pedidos" element={<GerenciarPedidos />} />
      </Routes>
    </>
  )
}

export default App
