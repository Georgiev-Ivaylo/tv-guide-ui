import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "utils/context";
import { useHttpService } from "utils/HttpService";
import { useStorage } from "utils/useStorage";

export function useProgramsData() {
  const [searchParams] = useSearchParams();
  const { isUser, userToken, clientToken } = useContext(AuthContext);
  const { setItem, getItem } = useStorage();
  let getMeta = false;

  let url = `/programs?page_size=9`;

  if (searchParams.get("query")) {
    url += "&query=" + searchParams.get("query");
  }

  if (searchParams.get("date")) {
    url += "&date=" + searchParams.get("date");
  }

  const metaURL = url;
  if (!getItem(metaURL)) {
    getMeta = true;
  }
  if (searchParams.get("page")) {
    url += "&page=" + searchParams.get("page");
  } else {
    url += "&page=1";
  }

  const { fetchData } = useHttpService(url);
  const {
    data: programs,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: [url, userToken],
    queryFn: () => fetchData(getMeta),
    staleTime: 5 * 60 * 1000, // cache for 10 minutes
  });

  if (loading) {
    return [[], loading, null];
  }
  if (programs?.meta) {
    if (!getItem(metaURL)) {
      setItem(metaURL, programs.meta);
    }
    return [programs.data, loading, programs.meta];
  }
  return [programs, loading, getItem(metaURL)];
}
