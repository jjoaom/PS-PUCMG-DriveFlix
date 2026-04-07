import { Routes, Route } from "react-router-dom";
import Header from "./pages/homepage/Header.jsx"
import Home from "./pages/homepage/Home";
import CadastroClient from "./pages/user/CadastroClient.jsx";
import LoginClient from "./pages/user/LoginClient.jsx";
//icones importados de https://react-icons.github.io/react-icons/ em cada componente segregado
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginClient />} />
        <Route path="/cadastro" element={<CadastroClient />} />
      </Routes>
    </>
  )
}

export default App
