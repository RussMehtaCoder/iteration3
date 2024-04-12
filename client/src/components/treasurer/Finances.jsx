import Unpaid from "./Unpaid";
import IncomeStatement from "./IncomeStatement";

const Finances = () => {
  return (
    <div className="w-full flex justify-around">
      <Unpaid />
      <IncomeStatement />
    </div>
  );
};

export default Finances;
