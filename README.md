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


```javascript
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

## step-4

Request and display basic information about repository commits.


```javascript
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

        {...}

      </div>
    );
  }
}
```

## step-5

install now globally

```
npm install -g now
```

then run deploy

```
now
```

and output will be

```
nextjs-github git:(step-4-end) ✗ now                     
> Deploying ~/work/nextjs-github
> No `name` in `package.json`, using nextjs-github
> Using Node.js 7.0.0 (default)
> Ready! https://nextjs-github-axtfrtzgmw.now.sh (copied to clipboard) [3s]
> Upload [====================] 100% 0.0s
> Sync complete (174.34kB) [4s] 
> Initializing…
> Building
> ▲ npm install
>  ‣ pre-commit@^1.2.2
>  ‣ isomorphic-fetch@^2.2.1
>  ‣ next@^2.0.0-beta
>  ‣ react@^15.4.2
> ✓ Using "yarn.lock"
>  ‣ babel-plugin-flow-react-proptypes@^0.21.0
>  ‣ eslint-plugin-import@^2.2.0
>  ‣ eslint-plugin-jest@^1.0.2
>  ‣ eslint-plugin-jsx@^0.0.2
> ✓ Installed 733 modules [11s]
> ▲ npm run build
> > @ build /home/nowuser/src
> > next build
> > Using external babel configuration
> > location: "/home/nowuser/src/.babelrc"
> ▲ npm start
> > @ start /home/nowuser/src
> > next start
> Deployment complete!

```

now you can visit page on https://marcelmokos-nextjs-github.now.sh/

[![alt text][2]][1]

  [1]: https://marcelmokos-nextjs-github.now.sh/
  [2]: http://image.prntscr.com/image/51d2c361a938485eb3c7e728f8806f11.png (https://marcelmokos-nextjs-github.now.sh/)

## step-6 refactor

use of pages/_document.js for common layout
use of components/layout for navigation
some fixes and improvements

https://marcelmokos-nextjs-github-refactor.now.sh/?user=marcelmokos
