import React, { useCallback, useEffect, useState } from "react";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";

type RepositoryDTO = {
  name: string;
};

const Main = () => {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repository, setRepository] = useState<RepositoryDTO[]>(() => {
    const repoStorage = localStorage.getItem("repos");
    if (repoStorage) {
      return JSON.parse(repoStorage);
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repository));
  }, [repository]);

  const handleSumbit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(false);
        try {
          if (newRepo === "") {
            throw new Error("type the repository name!");
          }
          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repository.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositor already inserted!");
          }

          const data = { name: response.data.full_name };
          setRepository([...repository, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(`error: ${error}`);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repository]
  );

  const handleDelete = useCallback(
    (name: string) => {
      const find = repository.filter((repo) => repo.name !== name);
      setRepository(find);
    },
    [repository]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRepo(event.target.value);
    setAlert(false);
  };

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My repositories repository
      </h1>

      <Form onSubmit={handleSumbit} error={alert}>
        <input
          type="text"
          placeholder="Add repository"
          onChange={handleInputChange}
          value={newRepo}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repository.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton>
                <FaTrash onClick={() => handleDelete(repo.name)}></FaTrash>
              </DeleteButton>
              <b>Repository: </b> {repo.name}
            </span>
            <Link to={`repository/${encodeURIComponent(repo.name)}`}>
              <FaBars size="20" />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
