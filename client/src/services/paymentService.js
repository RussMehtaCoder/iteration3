import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}/payments`;
import { auth } from "../config/firebase-config";

const create = async (newObject) => {
  const token = await auth.currentUser.getIdToken();
  return axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getMemberPayments = async () => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/member`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getExpenses = async () => {
  //this service should return paid payments by the treasurer
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/treasurer?`;
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

const getTreasurerCoachPayments = async (status) => {
  //may take query parameters: paysFor=hall/coach and status=paid/unpaid

  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/treasurer?paysFor=coach&status=${status}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getTreasurerHallPayments = async (status) => {
  //may take query parameters: paysFor=hall/coach and status=paid/unpaid

  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/treasurer?paysFor=hall&status=${status}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const conductPayment = async (paymentId) => {
  const token = await auth.currentUser.getIdToken();
  const url = `${baseUrl}/${paymentId}/pay`;
  return axios.post(
    url,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default {
  getExpenses,
  create,
  getMemberPayments,
  update,
  getTreasurerIncome,
  getTreasurerCoachPayments,
  getTreasurerHallPayments,
  conductPayment,
};
