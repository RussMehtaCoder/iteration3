import { useEffect } from "react";
import { useState } from "react";
import { UserDocContext } from "../../App";
import { useContext } from "react";
import PaymentForm from "../PaymentForm";
//import paymentService from "../../services/paymentService";

function Fees() {
  /* const userDoc = useContext(UserDocContext); */
  const [fees, setFees] = useState([
    { id: "2", paysFor: "session", amount: "$20" },
    { id: "2", paysFor: "lateFee", amount: "$30" },
    { id: "2", paysFor: "session", amount: "$20" },
  ]);

  /*useEffect(() => {
    const loadFees = async () => {
      const { data } = await feeService.getAll(userDoc.id); //or .name or .uid
      setfees(data);
    };
    loadFees();
    return () => {  //cleanup so rendered fees removed right away
      setfees([]);
    };
  }, []); */

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayClick = (fee) => {
    setSelectedPayment(fee);
    setShowPaymentForm(!showPaymentForm);
  };

  return (
    <div className="relative">
      <ul>
        {fees &&
          fees.map((fee, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-1/2 flex justify-between m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div>{fee.amount}</div>
                  <div>{fee.paysFor}</div>
                  <button
                    onClick={() => handlePayClick(fee)}
                    className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded"
                  >
                    PAY
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      {showPaymentForm && (
        <PaymentForm
          payment={selectedPayment}
          setShowPaymentForm={setShowPaymentForm}
          setFees={setFees}
          fees={fees}
        />
      )}
    </div>
  );
}

export default Fees;
