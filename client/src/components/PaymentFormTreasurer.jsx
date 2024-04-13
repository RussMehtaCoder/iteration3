import { useState } from "react";
import paymentService from "../services/paymentService";

const PaymentFormTreasurer = ({
  payment,
  setShowPaymentForm,
  groupedCoachExpenses,
  groupedHallExpenses,
  setGroupedCoachExpenses,
  setGroupedHallExpenses,
}) => {
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleConfirmPayment = async () => {
    console.log("Payment confirmed!");
    await paymentService.conductPayment(payment._id);
    //below to update UI without waiting for server
    const newGroupedHallExpenses = Object.keys(groupedHallExpenses).reduce(
      (acc, month) => {
        acc[month] = groupedHallExpenses[month].filter(
          (expense) => expense !== payment
        );
        return acc;
      },
      {}
    );

    const newGroupedCoachExpenses = Object.keys(groupedCoachExpenses).reduce(
      (acc, month) => {
        acc[month] = groupedCoachExpenses[month].filter(
          (expense) => expense !== payment
        );
        return acc;
      },
      {}
    );

    setGroupedCoachExpenses(newGroupedCoachExpenses);
    setGroupedHallExpenses(newGroupedHallExpenses);
    setShowPaymentForm(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Payment Form</h2>
        <div className="mb-4">
          <div>{payment.amount}</div>
        </div>
        <br />
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <br />
          <button
            onClick={handleConfirmPayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormTreasurer;
