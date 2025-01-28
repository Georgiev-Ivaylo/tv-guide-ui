import ListItem from "components/programs/ListItem";

const List = ({ programs, isUser }) => {
  if (!programs || programs.length == 0) {
    return;
  }

  let isChosen = false;
  let hasFirstMatch = false;
  let pageItems = programs.map((program) => {
    const date = new Date(program.start_datetime).getTime();
    const currentTime = new Date().getTime();
    const gapInMinutes = 60 * 60 * 1000;
    if (hasFirstMatch && isChosen) {
      isChosen = false;
    }
    if (
      !hasFirstMatch &&
      date > currentTime - gapInMinutes &&
      date < currentTime + gapInMinutes * 2
    ) {
      isChosen = true;
      hasFirstMatch = true;
    }

    return (
      <ListItem
        program={program}
        key={program.id}
        isUser={isUser}
        isChosen={isChosen}
      />
    );
  });

  return <ul className="row-grid">{pageItems}</ul>;
};

export default List;
