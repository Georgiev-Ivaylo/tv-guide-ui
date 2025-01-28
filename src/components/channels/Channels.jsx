import { useContext } from "react";

import Search from "components/common/Search";
import List from "components/channels/List";
import Pagination from "components/channels/Pagination";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "utils/context";
import { useChannelsData } from "components/channels/useChannelsData";
import Loading from "components/common/Loading";

const Channels = () => {
  const { isUser } = useContext(AuthContext);
  const [channels, loading, meta] = useChannelsData();
  return (
    <>
      <h1 className="title">Channels</h1>
      <Search placeholder="Search by title..." />
      {loading && <Loading />}
      {!loading && channels && <List channels={channels} />}
      {!loading && meta && <Pagination meta={meta} />}
      <Outlet />
    </>
  );
};

export default Channels;
