import React from "react";
import Layout from "../components/layout";
import Loading from "../components/loading";
import NoSSR from "react-no-ssr";


export default ({url}: Object) => (
  <Layout title="Progresive render" url={url}>

    <section>
      <h1>
        This section is server-side rendered.
      </h1>
    </section>

    <NoSSR onSSR={<Loading />}>
      <section>
        <h2>
          This section is
          <em>only</em>
          client-side rendered.
        </h2>
      </section>
    </NoSSR>

    <style jsx>{`
      section {
        align-items: center;
        display: flex;
        height: 25vh;
        justify-content: center;
      }
    `}</style>

  </Layout>
);
