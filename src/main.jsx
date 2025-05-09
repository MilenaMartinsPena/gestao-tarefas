import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter é usado para habilitar o React Router em toda a aplicação
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Importa o arquivo CSS principal 
import './styles.css';

// Monta o componente App dentro do elemento com id "root" no HTML,
// envolvendo-o em Router para permitir navegação entre rotas.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
);
