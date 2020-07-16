import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);
  
  useEffect(() => {
    async function loadRepositories() {
      const repositories = await api.get('repositories');

      const data = repositories.data;

      setRepository(data);
    }
    
    loadRepositories();
  }, []);
  
  async function handleAddRepository() {
    const titleParamether = "Ract c/ Andersson Monstro Blindao";
    const urlParamether = "youtubiu";
    const techsParamether = "Ract";
    

    const { data } = await api.post('repositories', {
      title: titleParamether,
      url: urlParamether,
      techs: techsParamether
    });
    const { id, title, url, techs } = data;
    setRepository(oldState => [...oldState, {id, title, url, techs}]);
  }

  async function handleRemoveRepository(id) {
    const repoDelete = await api.delete(`repositories/${id}`);
    const repositoriesWithOutDeleted = repository.filter(repo => repo.id !== id); 

    setRepository(repositoriesWithOutDeleted);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
