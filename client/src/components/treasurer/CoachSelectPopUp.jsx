const CoachSelectPopUp = ({ setCoachSelect, selectedSession }) => {
  //we need access to all the coaches here to select from
  const coaches = [{ name: "John Wok" }, { name: "Kathy Grib" }];

  const setCoach = (coach) => {
    //make coach the new coach of selectedSession
    selectedSession.coach = coach.name;
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
