import React from "react";
import Layout from "../components/layout";
import {getUserByUsername} from "../api";


type User = {
  avatar_url: string,
  login: string,
  bio?: string,
}

type IndexProps = {
  user: User,
  url: Object,
}

const UserInfo = ({user}: {user: User}) => (
  <div>
    <img
      src={user.avatar_url}
      alt="avatar"
      style={{width: 120, height: 120}}
    />
    <div>User: {user.login}</div>
    <div>Bio: {user.bio || ""}</div>
  </div>
);


export default class Index extends React.Component {
  static async getInitialProps({query}) {
    return {
      title: "Home",
      user: await getUserByUsername(query.user),
    };
  }

  props: IndexProps;
  inputUsername: any;

  redirectToUsername = () => {
    const username = this.inputUsername.value || "";

    this.props.url.push(`/?user=${username}`);
  }

  render() {
    const {url, user} = this.props;

    return (
      <Layout
        url={url}
        title={`Hello ${url.query.user}`}
      >

        <div>

          <br />

          <label htmlFor="input--username">
            Github username:
          </label>
          <input
            id="input--username"
            type="text"
            defaultValue={url.query.user || ""}
            ref={(input) => { this.inputUsername = input; }}
          />
          <button onClick={this.redirectToUsername}>Change github username</button>

        </div>

        <h2>Github User</h2>
        <UserInfo user={user} />


      </Layout>
    );
  }
}
