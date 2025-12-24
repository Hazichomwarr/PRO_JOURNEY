import axios from "axios";
import { ContactType } from "../_models/contact";

const API_URL = "http://localhost:3001/contacts";

export const getContacts = async (userId: string) => {
  try {
    const res = await axios.get(`${API_URL}?userId=${userId}`);
    const contacts = res.data;
    if (!contacts) {
      throw new Error("contacts not found");
    }
    return contacts;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("failed to contacts");
  }
};

export const getContactById = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}?id=${id}`);
    const contact = res.data;
    if (!contact) {
      throw new Error("contact not found");
    }
    return contact;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("failed to get contacts");
  }
};

export const createContact = async (formaData: FormData) => {
  try {
    const res = await axios.post(API_URL, formaData);
    return res.data;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("failed to create new contact.");
  }
};

export const updateContact = async (id: string, contact: ContactType) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, contact);
    return res.data;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("failed to update contact.");
  }
};

export const deleteContacts = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    console.log("error:", err);
    throw new Error("failed to delete contact");
  }
};
