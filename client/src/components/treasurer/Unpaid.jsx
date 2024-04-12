import { useState } from "react";
import PaymentForm from "../PaymentFormTreasurer";

const Unpaid = () => {
  //fetch payments that
  const hallExpenses = [
    { date: "2022-01-02", amount: 30 },
    { date: "2022-02-02", amount: 30 },
    { date: "2022-03-02", amount: 30 },
  ];

  const coachExpenses = [
    { date: "2022-01-02", amount: 10 },
    { date: "2022-01-02", amount: 10 },
    { date: "2022-02-02", amount: 10 },
    { date: "2022-03-02", amount: 10 },
    { date: "2022-03-02", amount: 10 },
  ];

  const groupByMonth = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(expense);
      return acc;
    }, {});
  };

  const [groupedHallExpenses, setGroupedHallExpenses] = useState(
    groupByMonth(hallExpenses)
  );
  const [groupedCoachExpenses, setGroupedCoachExpenses] = useState(
    groupByMonth(coachExpenses)
  );
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayClick = (expense) => {
    setSelectedPayment(expense);
    setShowPaymentForm(!showPaymentForm);
  };

  return (
    <div className="w-1/2 p-6 px-28 flex flex-col gap-3 text-center">
      <h1>Unpaid Expenses</h1>
      {Object.keys(groupedHallExpenses).map((month) => (
        <div key={month} className="">
          <h2>{month}</h2>
          {groupedHallExpenses[month].map((expense, index) => (
            <div key={index} className="flex justify-between p-1">
              Hall Expense: {expense.amount}
              <button
                className="w-20 bg-red-200 p-0.5 rounded"
                onClick={() => {
                  handlePayClick(expense);
                }}
              >
                Pay
              </button>
            </div>
          ))}
          {groupedCoachExpenses[month].map((expense, index) => (
            <div key={index} className="flex justify-between p-1">
              Coach Expense: {expense.amount}
              <button
                className="w-20 bg-red-200 p-0.5 rounded"
                onClick={() => {
                  handlePayClick(expense);
                }}
              >
                Pay
              </button>
            </div>
          ))}
        </div>
      ))}
      {showPaymentForm && (
        <PaymentForm
          payment={selectedPayment}
          setShowPaymentForm={setShowPaymentForm}
          groupedCoachExpenses={groupedCoachExpenses}
          groupedHallExpenses={groupedHallExpenses}
          setGroupedCoachExpenses={setGroupedCoachExpenses}
          setGroupedHallExpenses={setGroupedHallExpenses}
        />
      )}
    </div>
  );
};

export default Unpaid;
