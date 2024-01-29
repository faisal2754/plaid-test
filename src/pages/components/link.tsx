import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePlaidLink } from "react-plaid-link";

const generateTemporaryPlaidToken = async () => {
  const response = await axios.post("/api/generate-plaid-token");

  return response.data;
};

export default function Link(props: { linkToken: string }) {
  const { open, ready, error } = usePlaidLink({
    token: props.linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      toast.success("Thanks for connecting!");
    },
    onExit: (err, metadata) => {
      // handle the case when your user exits Link
      if (err) toast.error("Failed to connect bank account.");
    },
  });

  return (
    <>
      <button
        className="rounded-md border border-black px-4 py-2"
        onClick={() => open()}
        disabled={!ready}
      >
        Link account
      </button>
    </>
  );
}
