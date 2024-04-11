import { useEffect } from "react";
import { useState } from "react";
import { UserDocContext } from "../../App";
import { useContext } from "react";

function Sessions() {
  /* const userDoc = useContext(UserDocContext); */

  /*useEffect(() => {
    const loadSessions = async () => {
      const { data } = await sessionService.getAll(userDoc.id); //or .name or .uid
      setSessions(data);
    };
    loadSession();
    return () => {  //cleanup so rendered fees removed right away
      setSession([]);
    };
  }, []); */

  const sessions = [
    { date: "4/3/2024", coach: "John" },
    { date: "4/29/2024", coach: "Markus" },
    { date: "5/2/2024", coach: "Mya" },
  ];

  const handleSignUpClick = (e) => {
    e.target.innerText = "Signed";
    e.target.style.backgroundColor = "black";
    //service to add user to that session
  };

  const handleMonthSignUpClick = (e) => {
    e.target.innerText = "Signed";
    e.target.style.backgroundColor = "black";
    //service to add user to that session
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
                  <button
                    onClick={(e) => handleSignUpClick(e)}
                    className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
                  >
                    Sign Up
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Sessions;
