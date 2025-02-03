import { useContext } from "react";

import Search from "components/common/Search";
import List from "components/programs/List";
import { Link, Outlet } from "react-router-dom";
import ListSkeleton from "components/programs/ListSkeleton";
import Pagination from "components/common/Pagination";
import { useProgramsData } from "components/programs/useProgramsData";
import Loading from "components/common/Loading";

const Programs = () => {
  const [programs, loading, meta] = useProgramsData();

  return (
    <>
      <h1 className="title">Programs!</h1>
      <Search placeholder="Search by description..." />
      {loading && <Loading />}
      {!loading && programs && <List programs={programs} />}
      {!loading && programs && <Pagination meta={meta} />}
      <Outlet />
    </>
  );
};

export default Programs;
