import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Plaid test</title>
        <meta name="description" content="Plaid test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>Plaid test</div>
      </main>
    </>
  );
}
