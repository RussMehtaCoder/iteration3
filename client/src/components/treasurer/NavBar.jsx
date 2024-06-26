import Logo from "../../assets/karatelogo.jpg";
import { Link } from "react-router-dom";

const Navbar = ({ setUser }) => {
  return (
    <nav className="flex p-4 fixed top-0 w-full h-28 shadow-lg">
      <img src={Logo} alt="logo" className="w-20" />
      <ul className="flex justify-center w-full gap-40">
        <li className="flex justify-center items-center text-xl">
          <Link to="/finances">Finances</Link>
        </li>
        <li className="flex justify-center items-center text-xl">
          <Link to="/sessions">Sessions</Link>
        </li>
        <li className="flex justify-center items-center text-xl">
          <Link to="/members">Members</Link>
        </li>
      </ul>
      <button className="w-20" onClick={() => setUser(null)}>
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
