import React from "react";
import Link from "next/prefetch"; // eslint-disable-line
import {getCommitsForRepository} from "../api";

type RepoProps = {
  user: string,
  repo: any,
}

export default class Repo extends React.Component {
  static async getInitialProps({query}) {
    return {
      user: query.user,
      repo: await getCommitsForRepository(query.user, query.repo),
    };
  }

  props: RepoProps

  render() {
    const {user, repo} = this.props;

    return (
      <div>
        <h1>Github repository</h1>
        <Link href={`/?user=${user}`}>
          <a>back to user</a>
        </Link>
        <ul>
          {repo.map(commit => (
            <li key={commit.sha}>
              <Link href={commit.author.html_url}>
                <a>
                  <img src={commit.author.avatar_url} alt="avatar" style={{width: 120, height: 120}} />
                </a>
              </Link>
              <div>
                Username: {commit.author.login}
              </div>
              <Link href={commit.url}>
                <a>Commit url</a>
              </Link>
              <p>{commit.commit.message}</p>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}
