import { useEffect } from "react";
import { useState } from "react";
import Attendees from "./Attendees";
import sessionService from "../../services/sessionService";

function Sessions() {
  useEffect(() => {
    const loadSessions = async () => {
      const { data } = await sessionService.getAllForCoach(); //or .name or .uid
      setSessions(data);
      console.log(data);
    };
    loadSessions();
    return () => {
      //cleanup so rendered fees removed right away
      setSessions([]);
    };
  }, []);

  const [selectedSession, setSelectedSession] = useState(null);
  const [viewAttendees, setViewAttendees] = useState(false);
  const [sessions, setSessions] = useState([]);

  const viewMembers = (session) => {
    //service to get all attendees of session
    setSelectedSession(session);
    setViewAttendees(!viewAttendees);
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
    <div className>
      <ul>
        {sessions &&
          sessions.map((session, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div>{formatDate(session.date)}</div>
                  <div>
                    Sensei {session.coach.firstName} {session.coach.lastName}
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => viewMembers(session)}
                      className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
                    >
                      view attendees
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      {viewAttendees && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <Attendees
              setViewAttendees={setViewAttendees}
              selectedSession={selectedSession}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Sessions;
