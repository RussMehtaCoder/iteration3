import Navbar from "../components/coach/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sessions from "../components/coach/Sessions";
import Members from "../components/coach/Members";
import Inbox from "../components/coach/Inbox";

function CoachPage() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="mt-28">
          <Routes>
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/members" element={<Members />} />
            <Route path="/inbox" element={<Inbox />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default CoachPage;
