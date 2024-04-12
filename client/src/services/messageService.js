import axios from "axios";
import { auth } from "../config/firebase-config";
const baseUrl = `${import.meta.env.VITE_BASEURL}/messages/`;

const getAll = async () => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const create = async (id, body) => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}${id}/messages/`;
  return axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { getAll, create };
