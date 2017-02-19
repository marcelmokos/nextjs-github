import React, {Children} from "react";
import Head from "next/head";
import Link from "./link";

const Header = ({query}: {query: Object}) => (
  <header>
    <nav>
      <Link
        to={{pathname: "/", query}}
      >
        <a>Home</a>
      </Link>

      {" | "}

      <Link
        to={{pathname: "/repos", query}}
      >
        <a>Repositories</a>
      </Link>

      {" | "}

      <Link
        to={{pathname: "/progressive", query}}
      >
        <a>Progressive render</a>
      </Link>
    </nav>
  </header>
);

type LayoutProps = {
  children: Children,
  title?: string,
  url: Object,
};

export default (
  {children, title = "This is the default title", url}: LayoutProps,
) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <Header
      query={url.query}
    />

    {children}

    <br />

    <footer>
      I`m footer from components/layout
    </footer>
  </div>
);
