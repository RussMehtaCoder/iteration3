import Navbar from "../components/member/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sessions from "../components/member/Sessions";
import Fees from "../components/member/Fees";
import Inbox from "../components/member/Inbox";

function MemberPage({ setUser }) {
  return (
    <div>
      <Router>
        <Navbar setUser={setUser} />
        <div className="mt-28">
          <Routes>
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/inbox" element={<Inbox />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default MemberPage;
