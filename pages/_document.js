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
    return (
      <html
        lang="en"
      >
        <Head>
          <meta
            charSet="utf-8"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <body
          className="custom_class"
        >

          <Main />
          <NextScript />

          <footer>
            I`m footer from _document
          </footer>
        </body>
      </html>
    );
  }
}
