import { useEffect } from "react";
import { useState } from "react";
import { UserDocContext } from "../../App";
import { useContext } from "react";
import messageService from "../../services/messageService";

function Inbox() {
  /* const userDoc = useContext(UserDocContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await messageService.getAll(userDoc.id); //or .name or .uid
      setMessages(data);
    };
    loadMessages();
    return () => {  //cleanup so rendered messages removed right away
      setMessages([]);
    };
  }, []); */

  const messages = [
    "You are being charged $20 as a late fee",
    "Coach Carter is no longer teaching this week",
    "This is a reminder that you've skipped a payment! Avoid further charges and pay now",
  ];

  return (
    <div>
      <ul>
        {messages &&
          messages.map((message, index) => {
            return (
              <li key={index} className="p-3 border-b border-gray-200">
                <div>{message}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Inbox;
