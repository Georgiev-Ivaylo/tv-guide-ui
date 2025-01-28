import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "utils/context";
import { useHttpService } from "utils/HttpService";
import { useStorage } from "utils/useStorage";

export function useChannelsData() {
  const [searchParams] = useSearchParams();
  const { isUser, userToken, clientToken } = useContext(AuthContext);
  const { setItem, getItem } = useStorage();
  let getMeta = false;

  let url = `/channels?page_size=9`;

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
  url += "&page=" + searchParams.get("page");

  const { fetchData } = useHttpService(url);
  const {
    data: channels,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: [url, userToken],
    queryFn: () => fetchData(getMeta),
    staleTime: 10 * 60 * 1000, // cache for 10 minutes
  });

  if (loading) {
    return [[], loading, null];
  }
  if (channels?.meta) {
    if (!getItem(metaURL)) {
      setItem(metaURL, channels.meta);
    }
    return [channels.data, loading, channels.meta];
  }
  return [channels, loading, getItem(metaURL)];
}
