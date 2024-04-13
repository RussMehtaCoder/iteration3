import { useState, useEffect } from "react";
import PaymentForm from "../PaymentFormTreasurer";
import paymentService from "../../services/paymentService";

const Unpaid = () => {
  //fetch payments that
  const [hallExpenses, setHallExpenses] = useState(null);
  const [coachExpenses, setCoachExpenses] = useState(null);
  const [groupedHallExpenses, setGroupedHallExpenses] = useState(null);
  const [groupedCoachExpenses, setGroupedCoachExpenses] = useState(null);

  useEffect(() => {
    const loadHallFees = async () => {
      const { data } = await paymentService.getTreasurerHallPayments("unpaid");
      setHallExpenses(data);
    };
    const loadCoachFees = async () => {
      const { data } = await paymentService.getTreasurerCoachPayments("unpaid");
      setCoachExpenses(data);
    };

    loadHallFees();
    loadCoachFees();
    return () => {
      //cleanup so rendered fees removed right away
      setHallExpenses([]);
    };
  }, []);

  useEffect(() => {
    if (hallExpenses) {
      setGroupedHallExpenses(groupByMonth(hallExpenses));
    }
    if (coachExpenses) {
      setGroupedCoachExpenses(groupByMonth(coachExpenses));
    }
  }, [hallExpenses, coachExpenses]);

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

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayClick = (expense) => {
    setSelectedPayment(expense);
    setShowPaymentForm(!showPaymentForm);
  };

  return (
    <div className="w-1/2 p-6 px-28 flex flex-col gap-3 text-center">
      <h1>Unpaid Expenses</h1>
      {groupedHallExpenses &&
        groupedCoachExpenses &&
        Object.keys(groupedHallExpenses).map((month) => (
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
