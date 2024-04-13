import { useEffect, useState } from "react";
import paymentService from "../../services/paymentService";

const IncomeStatement = () => {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadFees = async () => {
      const { data } = await paymentService.getExpenses();
      setExpenses(data);
    };
    loadFees();
    return () => {
      //cleanup so rendered fees removed right away
      setExpenses([]);
    };
  }, []);

  useEffect(() => {
    const loadFees = async () => {
      const { data } = await paymentService.getTreasurerIncome();
      setPayments(data);
    };
    loadFees();
    return () => {
      //cleanup so rendered fees removed right away
      setExpenses([]);
    };
  }, []);

  // Group payments and expenses by month
  const groupByMonth = (arr) => {
    return arr.reduce((acc, item) => {
      const month = new Date(item.date).getMonth();
      if (!acc[month]) {
        acc[month] = { total: 0, items: [] };
      }
      acc[month].total += item.amount;
      acc[month].items.push(item);
      return acc;
    }, {});
  };

  const paymentsByMonth = groupByMonth(payments);
  const expensesByMonth = groupByMonth(expenses);

  const months = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="p-6 w-1/2">
      <h1 className="text-center">Monthly Income</h1>
      <div className="p-6 flex gap-3">
        {months.map((month, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow bg-white">
            <h2 className="font-semibold">
              {new Date(2022, month).toLocaleString("default", {
                month: "long",
              })}
            </h2>
            <h3 className="">Revenue: ${paymentsByMonth[month]?.total || 0}</h3>
            <h3 className="">
              Expenses: ${expensesByMonth[month]?.total || 0}
            </h3>
            <h3 className="">
              Profit:{" "}
              {(paymentsByMonth[month]?.total || 0) -
                (expensesByMonth[month]?.total || 0) >=
              0
                ? `$${
                    (paymentsByMonth[month]?.total || 0) -
                    (expensesByMonth[month]?.total || 0)
                  }`
                : `-$${Math.abs(
                    (paymentsByMonth[month]?.total || 0) -
                      (expensesByMonth[month]?.total || 0)
                  )}`}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeStatement;
