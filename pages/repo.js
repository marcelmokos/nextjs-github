import React from "react";
import Layout from "../components/layout";
import Link from "../components/link";
import {getCommitsForRepository} from "../api";

type RepoProps = {
  repo: any,
  url: Object,
}

export default class Repo extends React.Component {
  static async getInitialProps({query}) {
    return {
      repo: await getCommitsForRepository(query.user, query.repo),
    };
  }

  props: RepoProps

  render() {
    const {url, repo} = this.props;

    return (
      <Layout title="Progresive render" url={url}>
        <div>
          <h2>Github repository</h2>
          <ul>
            {repo.map(commit => <Commit key={commit.sha} commit={commit} />)}
          </ul>

        </div>

      </Layout>
    );
  }
}

const Commit = ({commit}: any) => (
  <li>
    <Link href={commit.author.html_url}>
      <a>
        <img
          src={commit.author.avatar_url}
          alt="avatar"
          style={{width: 120, height: 120}}
        />
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
);
