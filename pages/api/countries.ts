import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCountries } from "../../network/countries";

const countries = async (req: NextApiRequest, res: NextApiResponse) => {
  const countries = await getAllCountries()

  return res.status(200).json(countries)
};

export default countries;
