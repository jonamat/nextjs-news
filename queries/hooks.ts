import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { REQ_STATUS } from "../interfaces";
import { getNews } from "./";

export const useNews = (countryCode: string) => {
  const [status, setStatus] = useState<REQ_STATUS>(REQ_STATUS.LOADING);

  const { isLoading, error, data } = useQuery("news", () =>
    getNews(countryCode)
  );

  useEffect(() => {
    if (isLoading) setStatus(REQ_STATUS.LOADING);
    else if (error) setStatus(REQ_STATUS.ERROR);
    else setStatus(REQ_STATUS.SUCCESS);
  }, [isLoading, error, data]);

  return {
    status,
    error,
    data,
  };
};
