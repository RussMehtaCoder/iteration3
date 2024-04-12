import { useEffect } from "react";
import { useState } from "react";
import CoachSelectPopUp from "./CoachSelectPopUp";
import Attendees from "./Attendees";

function Sessions() {
  /*useEffect(() => {
    const loadSessions = async () => {
      const { data } = await sessionService.getAll(userDoc.id); //or .name or .uid
      setSessions(data);
    };
    loadSession();
    return () => {  //cleanup so rendered fees removed right away
      setSession([refresh]);
    };
  }, []); */
  const [coachSelect, setCoachSelect] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [viewAttendees, setViewAttendees] = useState(false);
  //need to populate attendees w/ docs (to use names) before getting them here
  const [sessions, setSessions] = useState([
    {
      date: "4/3/2024",
      coach: "John",
      attendees: [],
    },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: ["6618d47ddd5e7e25893081df"],
    },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: ["6618d47ddd5e7e25893081df"],
    },
    { date: "5/2/2024", coach: "Mya", attendees: [] },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: [],
    },
  ]);

  const changeCoach = (session) => {
    //service to update session
    setSelectedSession(session);
    setCoachSelect(!coachSelect);
  };

  const viewMembers = (session) => {
    //service to get all attendees of session
    setSelectedSession(session);
    setViewAttendees(!viewAttendees);
  };

  return (
    <div className>
      <ul>
        {sessions &&
          sessions.map((session, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div>{session.date}</div>
                  <div>Sensei {session.coach}</div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => changeCoach(session)}
                      className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
                    >
                      change coach
                    </button>
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
      {coachSelect && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <CoachSelectPopUp
              setCoachSelect={setCoachSelect}
              selectedSession={selectedSession}
            />
          </div>
        </div>
      )}
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
