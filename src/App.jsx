import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import NovaTarefa from './components/NovaTarefa';
import EditarTarefa from './components/EditarTarefa';





function App() {
  return (
    <div >
      <nav>
        <Link to="/">Início</Link> | <Link to="/nova">Nova Tarefa</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova" element={<NovaTarefa />} />
        <Route path="/editar/:id" element={<EditarTarefa />} />
      </Routes>
    </div>
  );
}

export default App;