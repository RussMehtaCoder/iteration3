import { UserDocContext } from "../App";
import { useContext } from "react";
import MemberPage from "./MemberPage";
import CoachPage from "./CoachPage";
import TreasurerPage from "./TreasurerPage";

const MainPage = () => {
  const userDoc = useContext(UserDocContext);
  if (userDoc.role == "member") {
    return <MemberPage />;
  } else if (userDoc.role == "coach") {
    return <CoachPage />;
  } else if (userDoc.role == "treasurer") {
    return <TreasurerPage />;
  }
};

export default MainPage;
