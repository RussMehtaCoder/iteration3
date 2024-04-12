import { useState } from "react";

const MessagePopUp = ({ receiver, setShowDraft }) => {
  const [message, setMessage] = useState("");

  const onSend = () => {
    //create the message with message state
    setShowDraft(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Send Message to {receiver.name}
        </h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="flex gap-5 justify-center">
          <button
            onClick={onSend}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
          <button
            onClick={() => setShowDraft(false)}
            className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePopUp;
