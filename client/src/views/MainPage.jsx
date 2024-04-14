import { UserDocContext } from "../App";
import { useContext } from "react";
import MemberPage from "./MemberPage";
import CoachPage from "./CoachPage";
import TreasurerPage from "./TreasurerPage";

const MainPage = ({ setUser }) => {
  const userDoc = useContext(UserDocContext);
  if (userDoc.role == "member") {
    return <MemberPage setUser={setUser} />;
  } else if (userDoc.role == "coach") {
    return <CoachPage setUser={setUser} />;
  } else if (userDoc.role == "treasurer") {
    return <TreasurerPage setUser={setUser} />;
  }
};

export default MainPage;
