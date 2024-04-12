import { useEffect } from "react";
import { useState } from "react";
import { UserDocContext } from "../../App";
import { useContext } from "react";
import sessionService from "../../services/sessionService";

function Sessions() {
  const userDoc = useContext(UserDocContext);
  const [sessions, setSessions] = useState([
    {
      date: "4/3/2024",
      coach: "John",
      attendees: [],
    },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: [],
    },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: [],
    },
    { date: "5/2/2024", coach: "Mya", attendees: [] },
    {
      date: "4/29/2024",
      coach: "Markus",
      attendees: [],
    },
  ]);

  useEffect(() => {
    const loadSessions = async () => {
      const { data } = await sessionService.getAll();
      setSessions(data);
    };
    loadSessions();
    return () => {  //cleanup so rendered fees removed right away
      setSessions([]);
    };
  }, []);

  const handleSignUpClick = (e, session) => {
    e.target.innerText = "Signed";
    e.target.style.backgroundColor = "black";
    //service to add user to that session
    //service to add unpaid user payment $20 for session
    console.log(session);
    session.attendees.push(userDoc._id);
    setSessions([...sessions]);
  };

  const handleMonthSignUpClick = (e) => {
    e.target.innerText = "Signed";
    e.target.style.backgroundColor = "black";
    for (let i = 0; i < 4; i++) {
      if (sessions.length > i && !isUserSignedUp(sessions[i])) {
        //service to add user to that session
        sessions[i].attendees.push(userDoc._id);
      }
    }
    //service to add unpaid user payment $80 for month
    setSessions([...sessions]);
  };

  const isUserSignedUp = (session) => {
    return session.attendees.includes(userDoc._id);
  };

  return (
    <div className="relative">
      <ul>
        <li className="flex justify-center">
          <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white-100">
            <div>Sign up for next 4 classes</div>
            <button
              onClick={(e) => handleMonthSignUpClick(e)}
              className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </li>
        {sessions &&
          sessions.map((session, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div>{session.date}</div>
                  <div>Sensei {session.coach}</div>
                  {isUserSignedUp(session) ? (
                    <button className="bg-black hover:bg-red-900 text-white font-bold py-1 px-4 rounded">
                      Signed
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleSignUpClick(e, session)}
                      className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Sessions;
