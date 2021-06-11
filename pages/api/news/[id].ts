import type { NextApiRequest, NextApiResponse } from "next";
import { getNewsByCountryCode } from "../../../network/news";

const news = async ({query: { id }}: NextApiRequest, res: NextApiResponse) => {
  if (typeof id !== "string") {
    return res.status(400);
  }

  const articles = await getNewsByCountryCode(id);

  return res.status(200).json(articles)
};

export default news;
