const IncomeStatement = () => {
  const payments = [
    { date: "2022-01-02", amount: 80 },
    { date: "2022-02-02", amount: 80 },
  ];

  const expenses = [
    { date: "2022-01-02", amount: 30 },
    { date: "2022-02-02", amount: 30 },
    { date: "2022-03-02", amount: 30 },
  ];

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
    <div className="p-6">
      <h1 className="text-center">Monthly Income</h1>
      <div className="p-6 flex gap-3">
        {months.map((month, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow bg-white">
            <h2 className="font-semibold">
              {new Date(2022, month).toLocaleString("default", {
                month: "long",
              })}
            </h2>
            <h3 className="">Revenue: {paymentsByMonth[month]?.total || 0}</h3>
            <h3 className="">Expenses: {expensesByMonth[month]?.total || 0}</h3>
            <h3 className="">
              Profit:{" "}
              {(paymentsByMonth[month]?.total || 0) -
                (expensesByMonth[month]?.total || 0)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeStatement;
