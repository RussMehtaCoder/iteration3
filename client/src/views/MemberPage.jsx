import Navbar from "../components/member/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sessions from "../components/member/Sessions";
import Fees from "../components/member/Fees";
import Inbox from "../components/member/Inbox";

function MemberPage() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MemberPage;
