import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePlaidLink } from "react-plaid-link";
import Link from "./components/link";

const generateTemporaryPlaidToken = async () => {
  const response = await axios.post("/api/generate-plaid-token");

  return response.data;
};

export default function Home() {
  const {
    isLoading: isPlaidTokenDataLoading,
    data: plaidTokenData,
    isError: isPlaidTokenError,
    error: plaidTokenDataError,
  } = useQuery({
    queryKey: ["test"],
    queryFn: generateTemporaryPlaidToken,
  });

  useEffect(() => {
    if (!isPlaidTokenDataLoading) {
      const plaidToken = plaidTokenData.data;
      if (!plaidToken) toast.error("Unexpected error.");

      console.log(plaidToken.temporaryToken.link_token);
    }
  }, [isPlaidTokenDataLoading, isPlaidTokenError]);

  return (
    <>
      <Head>
        <title>Plaid test</title>
        <meta name="description" content="Plaid test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-10 text-2xl font-bold">Plaid Sandbox</div>
        {plaidTokenData ? (
          <Link linkToken={plaidTokenData.data.temporaryToken.link_token} />
        ) : (
          <div>
            <div>Loading Plaid...</div>
          </div>
        )}
      </main>
    </>
  );
}
