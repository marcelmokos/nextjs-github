import React, {Children} from "react";
import Link from "./link";
import Head from "next/head";

type Props = {
  children: Children,
  title?: string,
  user?: string,
  url: Object,
}

const Header = ({query}: {query: Object}) => (
  <header>
    <nav>
      <Link to={{pathname: "/", query}}>
        <a>Home</a>
      </Link>

      {" | "}

      <Link to={{pathname: "/repos", query}}>
        <a>Repositories</a>
      </Link>

      {" | "}

      <Link to={{pathname: "/progressive", query}}>
        <a>Progressive render</a>
      </Link>
    </nav>
  </header>
);

export default ({children, title = "This is the default title", url}: Props) => (
  <div>
    <Head>
      <title>{ title }</title>
    </Head>

    <Header query={url.query} />

    { children }

    <br/>

    <footer>
      I`m footer from components/layout
    </footer>
  </div>
);
