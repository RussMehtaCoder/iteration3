import { useState, useEffect } from "react";
import userService from "../../services/userService";
import sessionService from "../../services/sessionService";

const CoachSelectPopUp = ({ setCoachSelect, selectedSession }) => {
  const [coaches, setCoaches] = useState([]);

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

  const setCoach = async (coach) => {
    //make coach the new coach of selectedSession

    //service call to update coach
    const { data } = await sessionService.updateSessionCoach(selectedSession._id, { coachId: coach._id });

    //need to refresh sessions list after service call

    selectedSession.coach = coach.name; // this should be commented out when service call works and state rerenders
    setCoachSelect(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Select a coach for {selectedSession.date}
      </h1>
      <ul className="flex gap-3">
        {coaches.map((coach, index) => {
          return (
            <li key={index} className="mb-2">
              <button
                onClick={() => setCoach(coach)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {coach.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoachSelectPopUp;
