import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/userService";

const Coaches = () => {
  const [coaches, setCoaches] = useState([
    { name: "John Smith", email: "my email", phone: "235252355" },
    { name: "John Smith", email: "my email", phone: "235252355" },
    { name: "John Smith", email: "my email", phone: "235252355" },
  ]);

  useEffect(() => {
    const loadCoaches = async () => {
      const { data } = await userService.getCoaches();
      setCoaches(data);
    };
    loadCoaches();
    return () => {
      //cleanup so rendered removed right away
      setCoaches([]);
    };
  }, []);

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
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Coaches;
