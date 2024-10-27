import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/pages/_requestHandler";
import NASA from "@/services/NASA";

const handler = requestHandler().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const lat = "33.2036331";
      const lon = "-87.5503964";
      const temp = await NASA.EOSDIS(lon, lat);
      console.log("temp", temp);
      return res.status(200).json(temp);
    } catch (error: any) {
      console.error(error);
      return res.status(error.response.status).json(error.response.data);
    }
  }
);

export default handler;
