import React from "react";
import Link from "../components/link";
import Layout from "../components/layout";
import {getUserReposByUsername} from "../api";

type TRepo = {
  name: string,
  stargazers_count: number,
}

const Repo = ({repo, user}: {repo: TRepo, user: string}) => (
  <div>
    <Link to={{pathname: "/repo", query: {user, repo: repo.name}}}>
      <a>{repo.name}</a>
    </Link>
    ⭐{repo.stargazers_count}
  </div>
);

export default class UserRepos extends React.Component {
  static async getInitialProps({query}) {
    return {
      repos: await getUserReposByUsername(query.user),
    };
  }

  props: {
    repos: Array<TRepo>,
    url: Object,
  };

  render() {
    const {url, repos} = this.props;

    return (
      <Layout
        title="Progresive render"
        url={url}
      >
        <div>
          <h2>Repositories</h2>
          {repos instanceof Array ? repos.map(
              repo => (
                <Repo
                  key={repo.name}
                  user={url.query.user || ""}
                  repo={repo}
                />
              ),
            ) : null}

        </div>
      </Layout>

    );
  }
}
