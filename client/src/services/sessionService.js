import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}/sessions`;
import { auth } from "../config/firebase-config";

const getAll = async () => {
  const token = await auth.currentUser.getIdToken();
  return axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAllForCoach = async () => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/?role=coach`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//need to pass valid coach id in body
const updateSessionCoach = async (sessionId, body) => {
  //body should be { coachId: <valid_coach_id> }
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${sessionId}/coach`;
  return axios.put(url, body,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}

//need to pass valid member id in body
const addSessionAttendee = async (sessionId, body) => {
  //body should be { attendeeId: <valid_member_id> }
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${sessionId}/attendees/add`;
  return axios.put(url, body,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}

const removeSessionAttendee = async (sessionId, body) => {
  //body should be { attendeeId: <valid_member_id> }
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${sessionId}/attendees/remove`;
  return axios.put(url, body,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}

const signUpMember = async (sessionId) => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${sessionId}/signup`;
  return axios.post(url,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}



// const create = async (id, body) => {
//   //need to pass valid coach id in body
//   const token = await auth.currentUser.getIdToken();
//   const url = `${baseUrl}`;
//   return axios.post(url, body, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export default {
  getAll,
  getAllForCoach,
  updateSessionCoach,
  addSessionAttendee,
  removeSessionAttendee,
  signUpMember
};
