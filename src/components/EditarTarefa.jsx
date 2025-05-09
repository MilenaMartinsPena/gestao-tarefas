
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EditarTarefa() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState(null);  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tasks/${id}`).then((response) => setTarefa(response.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tarefa.title) {
        alert('Título é obrigatório!');
        return;
      }
    await api.put(`/tasks/${id}`, tarefa);
    navigate('/');
  };

  if (!tarefa) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Editar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tarefa.title}
          onChange={(e) => setTarefa({ ...tarefa, title: e.target.value })}
        />
        <input
          type="text"
          value={tarefa.description}
          onChange={(e) => setTarefa({ ...tarefa, description: e.target.value })}
        />
        <select
          value={tarefa.priority}
          onChange={(e) => setTarefa({ ...tarefa, priority: e.target.value })}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>


         {/* SUBTAREFAS */}
      <h3>Subtarefas</h3>
      {tarefa.subtasks?.map((sub, index) => (
        <div key={sub.id || index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={sub.title}
            placeholder={`Subtarefa ${index + 1}`}
            onChange={(e) => {
              const novas = [...tarefa.subtasks];
              novas[index].title = e.target.value;
              setTarefa({ ...tarefa, subtasks: novas });
            }}
          />
          {/* Checkbox para marcar concluída */}
        <label>
        <input
            type="checkbox"
            checked={sub.done}
            onChange={(e) => {
            const novas = [...tarefa.subtasks];
            novas[index].done = e.target.checked;
            setTarefa({ ...tarefa, subtasks: novas });
        }}
      />
      Concluída
    </label>
          <button
            type="button"
            onClick={() => {
              const novas = tarefa.subtasks.filter((_, i) => i !== index);
              setTarefa({ ...tarefa, subtasks: novas });
            }}
          >
            Remover
          </button>
        </div>
      ))}

      {/* Adicionar nova subtarefa */}
      <button
        type="button"
        onClick={() => {
          const novas = tarefa.subtasks ? [...tarefa.subtasks] : [];
          novas.push({ id: Date.now(), title: '', done: false });
          setTarefa({ ...tarefa, subtasks: novas });
        }}
      >
        + Adicionar Subtarefa
      </button>
        <button className='add' type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditarTarefa;
