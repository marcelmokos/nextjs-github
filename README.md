# next.js example using github api

## step-0

```
npm init
```

## step-1

This step will add eslint, babel, flowtype, editorconfig and others.

Require yarn: npm install -g yarn 

Require json: npm install -g json

Bash scripts are used and I do not know if it can run on windows.

review the on https://gist.githubusercontent.com/marcelmokos/a99a4db1adf841632ab2fc8daf073d75 
```bash
bash <(curl -s -H 'Cache-Control: no-cache' https://gist.githubusercontent.com/marcelmokos/a99a4db1adf841632ab2fc8daf073d75/raw/install.sh)
```

## step-2

Create api in api folder for following github requests 
- getUserByUsername = (username: string) => {...} // https://developer.github.com/v3/users/#get-a-single-user
- getUserReposByUsername = (username: string) => {...} // https://developer.github.com/v3/repos/#list-user-repositories
- getCommitsForRepository = (username: string, repository: string) => {...} // https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository

create access_token since limit without login is 60 request per hour. //https://github.com/settings/tokens
```javascript
import "isomorphic-fetch";

const githubApi = "https://api.github.com";

export const getUserByUsername = async (username = "marcelmokos") => {
  ...
};

export const getUserReposByUsername = async (username = "marcelmokos") => {
  ...
};

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const getCommitsForRepository = async (username = "marcelmokos", repository = "nextjs-github") => {
  ...
};
```

## step-3

Request and display basic information about github user.


```
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

  render() { ... }
}
```
