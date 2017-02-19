import React from "react";
import Layout from "../components/layout";
import {getCommitsForRepository} from "../api";

type RepoProps = {
  repo: any,
  url: Object,
};

export default class Repo extends React.Component {
  static async getInitialProps({query}) {
    return {
      repo: await getCommitsForRepository(query.user, query.repo),
    };
  }

  props: RepoProps;

  render() {
    const {repo, url} = this.props;

    return (
      <Layout
        url={url}
        title={`Repository ${repo.name}`}
      >

        <div>
          <h2>Github repository</h2>
          <ul>
            {repo.map(commit => (
              <Commit
                key={commit.sha}
                commit={commit}
              />
            ))}
          </ul>

        </div>

      </Layout>
    );
  }
}

const Commit = ({commit}: any) => (
  <li>

    <a href={commit.author.html_url}>
      <img
        src={commit.author.avatar_url}
        alt="avatar"
        style={{width: 120, height: 120}}
      />
    </a>

    <div>
      Username: {commit.author.login}
    </div>
    <a href={commit.url}>
      Commit url
    </a>
    <p>{commit.commit.message}</p>
  </li>
);
