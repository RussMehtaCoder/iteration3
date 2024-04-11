import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import userService from "./services/userService";
import MainPage from "./views/MainPage";
import AuthPage from "./views/AuthPage";

//user logs in with firebase
//user.type is then used to conditionally render the relevant page

export const UserDocContext = createContext();

function App() {
  const [user, setUser] = useState(true); //   !!!useState(null)
  const [userDoc, setUserDoc] = useState(true); //   !!!useState(null)

  useEffect(() => {
    //fetch the user doc
    //set context api so that each document has access to this user doc
    const getUserDoc = async () => {
      if (user) {
        try {
          const response = await userService.getUserFirebaseUID();
          setUserDoc(true); //  !!!setUserDoc(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserDoc();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(true); //  !!!setUser(currentUser)
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
