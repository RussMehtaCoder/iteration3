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
    "You have been scheduled for class on 5/3/2024",
    "You have received a payment of $10 for the class on 4/9/2024",
  ];

  return (
    <div>
      <ul>
        {messages &&
          messages.map((message, index) => {
            return (
              <li
                key={index}
                className="p-3 border-b border-gray-200 bg-white bg-opacity-50"
              >
                <div>{message}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Inbox;
