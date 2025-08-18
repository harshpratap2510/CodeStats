// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // e.g. https://codestats-1-omk7.onrender.com
  withCredentials: true,
});

// GET helper that returns null on 401 instead of throwing
export async function safeGet(url, config = {}) {
  try {
    const res = await api.get(url, config);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 401) return null;
    throw err;
  }
}

export default api;
