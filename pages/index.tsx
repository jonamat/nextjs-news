import { FC } from "react";
import Link from "next/link";
import { COUNTRIES_PAGE } from "../locations/pages";

const Home: FC = () => {
  return (
    <>
      <div>Something about countries</div>
      <Link href={COUNTRIES_PAGE}>Checkout countries!</Link>
    </>
  );
};

export default Home;
