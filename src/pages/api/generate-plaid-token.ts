import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { PlaidLinkOptions } from "react-plaid-link";

type TPlaidTokenData = {
  expiration: Date;
  link_token: string;
  request_id: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const plaidTokenData = await axios.post<PlaidLinkOptions>(
    "https://sandbox.plaid.com/link/token/create",
    {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      client_name: "Elucidate Quickstart",
      country_codes: ["US"],
      language: "en",
      user: {
        client_user_id: "faisal test",
      },
      products: ["transactions"],
    },
  );

  res.status(200).json({
    ok: true,
    data: {
      temporaryToken: plaidTokenData.data,
    },
  });
};
