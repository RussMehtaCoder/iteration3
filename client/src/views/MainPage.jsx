import { UserDocContext } from "../App";
import { useContext } from "react";
import MemberPage from "./MemberPage";
import CoachPage from "./CoachPage";
import TreasurerPage from "./TreasurerPage";

const MainPage = () => {
  const userDoc = { role: "treasurer" }; //  !!!useContext(UserDocContext)
  if (userDoc.role == "member") {
    return <MemberPage />;
  } else if (userDoc.role == "coach") {
    return <CoachPage />;
  } else {
    return <TreasurerPage />;
  }
};

export default MainPage;
