import ListItem from "components/programs/ListItem";

const ListSkeleton = () => {
  let items = [];
  for (let i = 0; i < 9; ++i) {
    items.push(<ListItem program={{}} key={`fantom_${i}`} isHidden={true} />);
  }
  return <ul className="box-grid">{items}</ul>;
};

export default ListSkeleton;
