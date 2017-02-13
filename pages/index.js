import React from "react";
import Link from "next/prefetch"; // eslint-disable-line
import {getUserByUsername, getUserReposByUsername} from "../api";

type Repo = {
  name: string,
  stargazers_count: number,
}

type IndexProps = {
  user: {
    avatar_url: string,
    login: string,
    bio: string,
  },
  repos: Array<Repo>,
}

export default class Index extends React.Component {
  static async getInitialProps({query}) {
    return {
      user: await getUserByUsername(query.user),
      repos: await getUserReposByUsername(query.user),
    };
  }

  props: IndexProps

  render() {
    const {user, repos} = this.props;

    return (<div>
      <h1>Github</h1>

      <img src={user.avatar_url} alt="avatar" style={{width: 120, height: 120}} />
      <div>User: {user.login}</div>
      <div>Bio: {user.bio}</div>

      <div>
        <h2>Repositories</h2>
        {repos.map(repo => (
          <div key={repo.name}>
            <Link href={`/repo?user=${user.login}&repo=${repo.name}`}>
              <a>{repo.name}</a>
            </Link>
            ⭐{repo.stargazers_count}
          </div>
        ))}
      </div>

    </div>);
  }
}
