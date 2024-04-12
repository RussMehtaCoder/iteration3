const Unpaid = () => {
  //fetch payments that
  const hallExpenses = [
    { date: "2022-01-02", amount: 30 },
    { date: "2022-02-02", amount: 30 },
    { date: "2022-03-02", amount: 30 },
  ];

  const coachExpenses = [
    { date: "2022-01-02", amount: 10 },
    { date: "2022-02-02", amount: 10 },
    { date: "2022-03-02", amount: 10 },
  ];

  return (
    <div className="p-6">
      <h1>Unpaid Expenses</h1>
    </div>
  );
};

export default Unpaid;
