import React, {Children} from "react";
import Link from "./link";
import Head from "next/head";

type Props = {
  children: Children,
  title?: string,
  user?: string,
  url: Object,
}

export default ({children, title = "This is the default title", url}: Props) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link to={{pathname: "/", query: url.query}}><a>Home</a></Link>{" | "}
        <Link to={{pathname: "/repos", query: url.query}}><a>Repositories</a></Link>{" | "}
        <Link to={{pathname: "/progressive", query: url.query}}><a>Progressive render</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      I`m here to stay
    </footer>
  </div>
);
