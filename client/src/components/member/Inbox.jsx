import { useEffect } from "react";
import { useState } from "react";
import messageService from "../../services/messageService";

function Inbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await messageService.getAll(); //or .name or .uid
      setMessages(data.reverse());
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
                <div>{message.text}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Inbox;
