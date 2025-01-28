import { useContext } from "react";

import Search from "components/common/Search";
import List from "components/programs/List";
import Pagination from "components/programs/Pagination";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { AuthContext } from "utils/context";
import { useQuery } from "@tanstack/react-query";
import ListSkeleton from "components/programs/ListSkeleton";
import { useHttpService } from "utils/HttpService";

const Programs = () => {
  const [searchParams] = useSearchParams();
  const { isUser, userToken, clientToken } = useContext(AuthContext);

  let url = `/programs?page=${searchParams.get("page")}`;

  if (searchParams.get("query")) {
    url += "&query=" + searchParams.get("query");
  }

  if (searchParams.get("date")) {
    url += "&date=" + searchParams.get("date");
  }

  const { fetchData } = useHttpService(url);

  const {
    data: programs,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: [url, userToken],
    queryFn: () => fetchData(),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  return (
    <>
      <h1 className="title">Programs!</h1>
      {isUser && (
        <Link to="./new" className="isolated-nav-btn">
          New
        </Link>
      )}
      <Search placeholder="Search by description..." />
      {loading && <ListSkeleton />}
      {!loading && <List programs={programs} isUser={isUser} />}
      <Pagination />
      <Outlet />
    </>
  );
};

export default Programs;
