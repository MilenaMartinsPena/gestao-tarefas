import axios from 'axios';

// Aqui cria uma instância do Axios com a URL base da sua API
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export default api;