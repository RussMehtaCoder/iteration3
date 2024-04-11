import Navbar from "../components/treasurer/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sessions from "../components/treasurer/Sessions";
import Finances from "../components/treasurer/Finances";
import Members from "../components/treasurer/Members";
import Coaches from "../components/treasurer/Coaches";

function TreasurerPage() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Router>
    </div>
  );
}

export default TreasurerPage;
