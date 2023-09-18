import Head from "next/head";

export default function PageTitle({ title } : { title?: string }): React.ReactNode {
  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="Author" content="Constellation" key="author"/>
      <meta name="description" content='Social network much alike Twitter, but way better.'/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Constellation Social Network" key="title" />
      <title>Constellation {`- ${title}`}</title>
    </Head>
  )
}
