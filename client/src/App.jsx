import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import userService from "./services/userService";
import MainPage from "./views/MainPage";
import AuthPage from "./views/AuthPage";

export const UserDocContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    //fetch the user doc
    //set context api so that each document has access to this user doc
    const getUserDoc = async () => {
      if (user) {
        try {
          const response = await userService.getUserFirebaseUID();
          setUserDoc(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserDoc();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (user && userDoc) {
    return (
      <UserDocContext.Provider value={userDoc}>
        <MainPage setUser={setUser} />
      </UserDocContext.Provider>
    );
  } else if (user === null) {
    return <AuthPage />;
  }
}

export default App;
