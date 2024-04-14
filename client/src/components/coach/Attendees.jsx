import { useState } from "react";
import sessionService from "../../services/sessionService";

const Attendees = ({ setViewAttendees, selectedSession }) => {
  const [session, setSession] = useState(selectedSession);

  const closePopUp = () => {
    setViewAttendees(false);
  };

  const removeAttendee = async (e, attendeeToRemove) => {
    e.stopPropagation();
    //service to remove attendee from
    await sessionService.removeSessionAttendee(selectedSession._id, {
      attendeeId: attendeeToRemove._id,
    });
    const newAttendees = session.attendees.filter(
      (attendee) => attendee !== attendeeToRemove
    );
    setSession({ ...session, attendees: newAttendees });
  };

  const formatDate = (uglyDate) => {
    const date = new Date(uglyDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };

  return (
    <div className="p-6" onClick={closePopUp}>
      <h1 className="text-2xl font-bold mb-4">
        Attendees for {formatDate(selectedSession.date)}
      </h1>
      <ul>
        {session.attendees.map((attendee, index) => {
          return (
            <li key={index} className="mb-2">
              <div className="flex justify-between">
                {attendee.firstName} {attendee.lastName}
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
