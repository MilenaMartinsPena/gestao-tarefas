
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function NovaTarefa() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('baixa');
  const [subtaskInput, setSubtaskInput] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const navigate = useNavigate();

  // Adiciona uma subtask ao array
  const adicionarSubtask = () => {
    if (!subtaskInput.trim()) return;

    const novaSubtask = {
      id: Date.now(),
      title: subtaskInput,
      done: false
    };

    setSubtasks([...subtasks, novaSubtask]);
    setSubtaskInput('');
  };

  // Remove uma subtask
  const removerSubtask = (id) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Título é obrigatório!');
      return;
    }
    await api.post('/tasks', { title, description, priority, done: false, subtasks});
    navigate('/');
  };

  return (
    <div className='center'>
      <h1>Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          
        />     
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
        <div>
          <h3>Subtarefas</h3>
          <input
            type="text"
            placeholder="Adicionar subtarefa"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
          />
          <button type="button" onClick={adicionarSubtask}>{!subtaskInput? '' : '+ Adicionar'}</button>

          <ul>
            {subtasks.map((sub) => (
              <li key={sub.id}>
                {sub.title}
                <button type="button" onClick={() => removerSubtask(sub.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>

        <button className='add' type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default NovaTarefa;
