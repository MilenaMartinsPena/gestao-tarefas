// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import api from '../api.js';
import { Link } from 'react-router-dom';
import '../styles.css'


function Home() {
  const [tarefas, setTarefas] = useState([]);
  const ordemPrioridade = {
    alta: 1,
    media: 2,
    baixa: 3
  };
 

  // Quando o componente carrega, buscar as tarefas
  useEffect(() => {
    buscarTarefas();
  }, []);


  //Quando busca as tarefas, ordena a lista por prioridade
  const buscarTarefas = async () => {
    const response = await api.get('/tasks'); 
    const tarefasOrdenadas = response.data.sort((a, b) => {
        return ordemPrioridade[a.priority] - ordemPrioridade[b.priority];
      });   
    setTarefas(tarefasOrdenadas);
  };
  
   // Função para excluir uma tarefa por ID
  const apagarTarefa = async (id) => {
    if (confirm('Tem certeza que deseja apagar?')) {
      await api.delete(`/tasks/${id}`);
      buscarTarefas();
    }
  };

  // Função para alternar o estado de conclusão de uma tarefa
  const marcarConcluida = async (tarefa) => {
    await api.put(`/tasks/${tarefa.id}`, { ...tarefa, done: !tarefa.done });
    buscarTarefas();
  };

  // Função para alternar o estado de conclusão de uma Subtarefa
  const alternarSubtask = async (tarefaId, subtaskId) => {
    const tarefa = tarefas.find(t => t.id === tarefaId);
    const novasSubtasks = tarefa.subtasks.map((s) =>
      s.id === subtaskId ? { ...s, done: !s.done } : s
    );
  
    await api.put(`/tasks/${tarefaId}`, { ...tarefa, subtasks: novasSubtasks });
    buscarTarefas();
  };
  

  return (
    <div >
      <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <div className='container' style={{ textDecoration: tarefa.done ? 'line-through' : 'none' }}>
               
                {/* Atribui um símbolo de acordo com a prioridade da tarefa */}
                <span >
                    {tarefa.priority === 'alta' && '⚠️ '}
                    {tarefa.priority === 'media' && '🔶 '}
                    {tarefa.priority === 'baixa' && '🔵 '}
                    {tarefa.title} 
                    <p className='description'>{tarefa.description}</p>            
                </span>

                {/* lista Subtarefas */}
                {tarefa.subtasks && tarefa.subtasks.length > 0 && (
                <ul className="subtask-list">
                    {tarefa.subtasks.map((sub) => (
                    <li key={sub.id} className={`subtask ${sub.done ? 'completed' : ''}`}>
                        <input
                        type="checkbox"
                        checked={sub.done}
                        onChange={() => alternarSubtask(tarefa.id, sub.id)}
                        />
                        {sub.title}
                    </li>
                    ))}
                </ul>
                )}
                
                <div>
                    <button onClick={() => marcarConcluida(tarefa)}>
                    {tarefa.done ?  'Desmarcar' :  'Concluir'}
                    </button>
                    <Link to={`/editar/${tarefa.id}`}>
                    <button>Editar</button>
                    </Link>
                    <button className='delete' onClick={() => apagarTarefa(tarefa.id)}>Apagar</button>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
