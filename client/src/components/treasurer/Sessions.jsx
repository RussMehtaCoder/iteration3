import { useEffect } from "react";
import { useState } from "react";
import CoachSelectPopUp from "./CoachSelectPopUp";

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

  const sessions = [
    { date: "4/3/2024", coach: "John" },
    { date: "4/29/2024", coach: "Markus" },
    { date: "5/2/2024", coach: "Mya" },
  ];

  const changeCoach = (session) => {
    //service to update session
    setSelectedSession(session);
    setCoachSelect(!coachSelect);
  };

  const viewMembers = (session) => {};

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
                      view members
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
    </div>
  );
}

export default Sessions;
