import { useState } from "react";

const Attendees = ({ setViewAttendees, selectedSession }) => {
  const [session, setSession] = useState(selectedSession);

  const closePopUp = () => {
    setViewAttendees(false);
  };

  const removeAttendee = (e, attendeeToRemove) => {
    e.stopPropagation();
    //service to remove attendee from
    const newAttendees = session.attendees.filter(
      (attendee) => attendee !== attendeeToRemove
    );
    setSession({ ...session, attendees: newAttendees });
  };

  return (
    <div className="p-6" onClick={closePopUp}>
      <h1 className="text-2xl font-bold mb-4">
        Attendees for {selectedSession.date}
      </h1>
      <ul className="flex gap-3">
        {session.attendees.map((attendee, index) => {
          return (
            <li key={index} className="mb-2">
              <div className="flex gap-3">
                {attendee}
                <button
                  onClick={(e) => removeAttendee(e, attendee)}
                  className="bg-red-500 hover:bg-red-900 text-white font-bold py-0.2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Attendees;
