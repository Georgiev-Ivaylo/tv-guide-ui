import ListItem from "components/channels/ListItem";

const List = ({ channels }) => {
  if (!channels || channels.length == 0) {
    return <h3 className="box-title">Nothing available</h3>;
  }

  let pageItems = channels.map((channel) => (
    <ListItem channel={channel} key={channel.id} />
  ));
  if (channels.length <= 8) {
    for (let i = 0; i < 9 - channels.length; ++i) {
      pageItems.push(
        <ListItem
          key={`program-fantom-${i}`}
          program={{}}
          fantomKey={`fantom_${i}`}
          isHidden={true}
        />
      );
    }
  }

  return <ul className="box-grid">{pageItems}</ul>;
};

export default List;
