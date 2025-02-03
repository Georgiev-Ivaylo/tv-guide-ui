import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Pagination = ({ meta }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (meta === null) {
      return;
    }

    setTotalPages(meta.last_page);
  }, [meta]);

  const createPageURL = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  };

  if (totalPages <= 1) {
    return;
  }

  return (
    <div className="pag-grid">
      {currentPage >= 2 && (
        <span
          onClick={() => createPageURL(currentPage - 1)}
          className="pag-btn left-arrow"
        ></span>
      )}
      {currentPage >= 2 && (
        <span
          onClick={() => createPageURL(currentPage - 1)}
          className="pag-btn"
        >
          {" "}
          {currentPage - 1}{" "}
        </span>
      )}
      <span className="pag-btn active"> {currentPage} </span>
      {currentPage <= totalPages - 1 && (
        <span
          onClick={() => createPageURL(currentPage + 1)}
          className="pag-btn"
        >
          {" "}
          {currentPage + 1}{" "}
        </span>
      )}
      {currentPage <= totalPages - 2 && (
        <span
          onClick={() => createPageURL(currentPage + 2)}
          className="pag-btn"
        >
          {" "}
          {currentPage + 2}{" "}
        </span>
      )}
      {currentPage <= totalPages - 1 && (
        <span
          onClick={() => createPageURL(currentPage + 1)}
          className="pag-btn right-arrow"
        ></span>
      )}
    </div>
  );
};

export default Pagination;
