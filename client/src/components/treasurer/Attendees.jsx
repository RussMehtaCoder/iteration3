const Attendees = ({ setViewAttendees, selectedSession }) => {
  const closePopUp = () => {
    setViewAttendees(false);
  };

  return (
    <div className="p-6" onClick={closePopUp}>
      <h1 className="text-2xl font-bold mb-4">
        Attendees for {selectedSession.date}
      </h1>
      <ul className="flex gap-3">
        {selectedSession.attendees.map((attendee, index) => {
          return (
            <li key={index} className="mb-2">
              <div>{attendee}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Attendees;
