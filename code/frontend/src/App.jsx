import { Routes, Route } from "react-router-dom";
import Header from "./components/homepage/Header";
import Home from "./components/homepage/Home";
//icones importados de https://react-icons.github.io/react-icons/ em cada componente segregado
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  )
}

export default App
