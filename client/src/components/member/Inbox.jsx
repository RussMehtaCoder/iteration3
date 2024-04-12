import { useEffect } from "react";
import { useState } from "react";
import messageService from "../../services/messageService";

function Inbox() {
  const [messages, setMessages] = useState([
    "You are being charged $20 as a late fee",
    "Coach Carter is no longer teaching this week",
    "This is a reminder that you've skipped a payment! Avoid further charges and pay now",
  ]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await messageService.getAll(); //or .name or .uid
      setMessages(data);
    };
    loadMessages();
    return () => {
      //cleanup so rendered messages removed right away
      setMessages([]);
    };
  }, []);

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
