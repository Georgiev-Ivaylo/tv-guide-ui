import { useEffect, useRef } from "react";
import { time } from "utils/formater";

const ListItem = ({ program, isChosen = false }) => {
  const listItemRef = useRef(null);
  useEffect(() => {
    if (isChosen && listItemRef.current) {
      listItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isChosen]);

  const date = new Date(program.start_datetime);
  return (
    <li className="row" ref={listItemRef}>
      <div className="row-details">
        <p className="row-line col-span-1">{time(date)}</p>
        <h5 className="row-title col-span-5 line-clamp-1">
          {program.title}
          {program.channel ? `(${program.channel.title})` : ""}
        </h5>
      </div>
    </li>
  );
};

export default ListItem;
