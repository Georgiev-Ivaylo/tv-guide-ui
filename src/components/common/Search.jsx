import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function useDebounce(cb, delay) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);
  return debounceValue;
}

const Search = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const originalQuery = searchParams.get("query")?.toString();
  const [query, setQuery] = useState(originalQuery);
  const debouncedQuery = useDebounce(query, 2000);

  const today = new Date();
  const year = today.getFullYear();
  const currentDay = today.getDate();
  let month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  let options = [];
  if (month <= 9) {
    month = "0" + month;
  }
  let printDay = "";
  for (let day = 1; day <= daysInMonth; ++day) {
    if (day <= 9) {
      printDay = "0" + day;
    } else {
      printDay = day;
    }
    if (day === currentDay) {
    }
    options.push(
      <option key={printDay} value={year + "-" + month + "-" + printDay}>
        {printDay}-{month}-{year}
      </option>
    );
  }

  useEffect(() => {
    if (originalQuery === debouncedQuery) {
      return;
    }

    searchParams.set("page", 1);
    if (debouncedQuery) {
      searchParams.set("query", debouncedQuery);
      setSearchParams(searchParams);
      return;
    }

    searchParams.delete("query");
    setSearchParams(searchParams);
  }, [debouncedQuery]);

  useEffect(() => {
    if (searchParams.get("date")) {
      return;
    }

    if (currentDay <= 9) {
      currentDay = "0" + currentDay;
    }
    searchParams.set("date", year + "-" + month + "-" + currentDay);
    setSearchParams(searchParams);
  }, []);
  const handleDate = (event) => {
    searchParams.set("page", 1);
    console.log(event.target.value);
    if (event.target.value) {
      searchParams.set("date", event.target.value);
      setSearchParams(searchParams);

      return;
    }

    searchParams.delete("date");
  };

  return (
    <div className="search-grid">
      <input
        className="search-quick"
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <select
        value={searchParams.get("date")?.toString()}
        onChange={handleDate}
        className="search-select"
      >
        {options}
      </select>
    </div>
  );
};

export default Search;
