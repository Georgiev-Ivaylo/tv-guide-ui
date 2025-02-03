import List from "components/programs/List";
import { date } from "utils/formater";

const ListItem = ({ channel, isHidden = false }) => {
  if (!channel || !channel.programs) {
    return "";
  }
  return (
    <li className={`box overflow-hidden ${isHidden ? "fantom" : ""}`}>
      <h4 className="box-title">
        {channel.description ?? "..."}
        <p className="text-sm">
          {date(new Date(channel.programs[1].start_datetime))}
        </p>
      </h4>
      {channel.title && (
        <div className="box-list">
          <List programs={channel.programs} />
        </div>
      )}
      {!channel.title && <div className="overflow-y-auto h-40">&nbsp;</div>}
    </li>
  );
};

export default ListItem;
