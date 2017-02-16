import Link from "../components/link";
import Document, {Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);

    return {
      ...props,
      pathname: ctx.pathname,
      query: ctx.query,
    };
  }

  render() {
    const {title, query} = this.props;

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>Default title</title>
        </Head>
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
        <body className="custom_class">

          <Main />
          <NextScript />

          <footer>
        I`m footer
      </footer>
        </body>
      </html>
    );
  }
}
