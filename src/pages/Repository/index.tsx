import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { BackButton, Container, FilterList, IssuesList, Loading, Owner, PageActions } from "./styles";

interface RepositoryDTO {
  name: string;
  description: string;
  owner: { avatar_url: string; login: string };
}

interface IssueDTO {
  id: string;
  user: { login: string; avatar_url: string };
  title: string;
  html_url: string;
  labels: [{ id: string; name: string }];
}

interface FilterDTO {
  label: string;
  active: boolean;
  state: string;
}

const Repository = () => {
  const [repositories, setRepositories] = useState<RepositoryDTO | null>(null);
  const [issues, setIssues] = useState<IssueDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);

  const filters: FilterDTO[] = useMemo(() => {
    return [
      {
        label: "all",
        state: "all",
        active: true,
      },
      {
        label: "Open",
        state: "open",
        active: false,
      },
      {
        label: "Closed",
        state: "closed",
        active: true,
      },
    ];
  }, []);

  const params = useParams();

  useEffect(() => {
    async function load() {
      const [respositorioData, issuesData] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`, {
          params: {
            state: filters[index].state,
            per_page: 5,
          },
        }),
      ]);

      setRepositories(respositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [params, index, filters]);

  useEffect(() => {
    async function loadIssue() {
      const [issuesData] = await Promise.all([
        api.get(`repos/${params.repository}/issues`, {
          params: {
            state: filters[index].state,
            per_page: 5,
            page: page,
          },
        }),
      ]);

      setIssues(issuesData.data);
      setLoading(false);
    }

    loadIssue();
  }, [params, page, index, filters]);

  const handlePage = (action: string) => {
    setPage(action === "back" ? page - 1 : page + 1);
  };

  const handleState = (index: number) => {
    setIndex(index);
  };

  if (loading) {
    return (
      <Loading>
        <h1>Loading...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={25} />
      </BackButton>

      <Owner>
        <img
          src={repositories?.owner.avatar_url}
          alt={repositories?.owner.login}
        />
        <h1>{repositories?.name}</h1>
        <p>{repositories?.description}</p>
      </Owner>

      <FilterList active={index}>
        {filters.map((filter, index) => (
          <button key={index} onClick={() => handleState(index)}>
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.map((issue) => (
          <li key={issue.id}>
            <img src={issue.user?.avatar_url} alt="" />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={label.id}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button disabled={page < 2} onClick={() => handlePage("back")}>
          Back
        </button>
        <button onClick={() => handlePage("next")}>Next</button>
      </PageActions>
    </Container>
  );
};

export default Repository;
