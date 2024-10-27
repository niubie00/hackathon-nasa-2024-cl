import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default function requestHandler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    attachParams: true,
    onNoMatch: (req, res) => {
      res.status(405).json({ error: `${req.method} not allowed` });
    },
    onError: (error, req, res) => {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json({ error });
      } else {
        res.status(500).json({ error });
      }
    },
  });
}
