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

export default { getAll, getAllForCoach };
