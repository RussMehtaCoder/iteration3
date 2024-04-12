import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}/payments`;
import { auth } from "../config/firebase-config";

const create = async (newObject) => {
  const token = await auth.currentUser.getIdToken();
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getFees = async (id) => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${id}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const update = async (id, newObject) => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${id}`;
  return axios.put(url, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getTreasurerIncome = async () => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/treasurer/income`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getFees,
  create,
  update,
  getTreasurerIncome,
};
