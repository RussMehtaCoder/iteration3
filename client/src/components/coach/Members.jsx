import { useEffect } from "react";
import { useState } from "react";
import MessagePopUp from "../MessagePopUp";
import userService from "../../services/userService";
import messageService from "../../services/messageService";

const Members = () => {
  const [members, setMembers] = useState([]);

  const [showDraft, setShowDraft] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
      const { data } = await userService.getMembers(); //or .name or .uid
      setMembers(data);
    };
    loadMembers();
    return () => {
      //cleanup so rendered removed right away
      setMembers([]);
    };
  }, []);

  const sortByNotPaid = () => {
    setMembers(
      [...members].sort(
        (b, a) =>
          a.classesAttended -
          a.classesPaidFor -
          (b.classesAttended - b.classesPaidFor)
      )
    );
  };

  const alertMember = (member, e) => {
    //create an alert message about late payments
    messageService.create({
      receiver: member._id,
      text: "ALERT! Please pay your late payment(s)!",
    });
    //messageService to create this POST request
    e.target.innerText = "Alerted";
    e.target.style.backgroundColor = "black";
    e.target.disabled = true;
  };

  const messageMember = (member) => {
    setSelectedMember(member);
    setShowDraft(!showDraft);
  };

  return (
    <div>
      <ul className="px-40">
        <li className="flex justify-center">
          <div className="w-2/3 flex m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
            <div className="w-32">Name</div>
            <div className="w-32">Phone</div>
            <div className="w-32 cursor-pointer" onClick={sortByNotPaid}>
              <div>Late Payments</div>
              <div className="text-xs">Press to Sort</div>
            </div>
          </div>
        </li>
        {members &&
          members.map((member, index) => {
            return (
              <li key={index} className="flex justify-center">
                <div className="w-2/3 flex m-1 p-2 px-9 border-b border-gray-200 bg-white bg-opacity-50">
                  <div className="w-32">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="w-32">{member.phoneNumber}</div>
                  <div className="w-32">
                    {member.classesAttended - member.classesPaidFor < 0
                      ? 0
                      : member.classesAttended - member.classesPaidFor}
                  </div>
                  <div className="w-48 flex justify-end gap-6">
                    {member.classesAttended - member.classesPaidFor > 0 ? (
                      <button
                        onClick={(e) => alertMember(member, e)}
                        className=" w-20 bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded flex justify-center"
                      >
                        Alert
                      </button>
                    ) : null}
                    <button
                      onClick={() => messageMember(member)}
                      className=" w-20 bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-4 rounded flex justify-center"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      {showDraft && (
        <MessagePopUp receiver={selectedMember} setShowDraft={setShowDraft} />
      )}
    </div>
  );
};

export default Members;
