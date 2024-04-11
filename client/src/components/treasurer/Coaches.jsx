import { useEffect } from "react";
import { useState } from "react";

const Coaches = () => {
  //const [coaches, setCoaches] = useState();

  /*useEffect(() => {
    const loadCoaches = async () => {
      const { data } = await coachService.getAll(userDoc.id); //or .name or .uid
      setCoaches(data);
    };
    loadCoaches();
    return () => {  //cleanup so rendered removed right away
      setCoaches([]);
    };
  }, []); */

  const coaches = [
    { name: "John Smith", email: "my email", phone: "235252355" },
    { name: "John Smith", email: "my email", phone: "235252355" },
    { name: "John Smith", email: "my email", phone: "235252355" },
  ];

  return (
    <div>
      <ul>
        {coaches &&
          coaches.map((coach, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div>{coach.name}</div>
                  <div>{coach.email}</div>
                  <div>{coach.phone}</div>
                  <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded">
                    message
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Coaches;
