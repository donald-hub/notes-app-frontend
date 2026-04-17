import { getToken } from "../lib/auth";

const BASE_URL = "https://notes-app-rr2n.onrender.com/api";

const authHeaders = () => {
  const token = getToken();

  if (!token) {
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET all notes
export const getNotes = async () => {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
};

// GET single note
export const getNoteById = async (id) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
};

// CREATE note
export const createNote = async (note) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return res.json();
};

// UPDATE note
export const updateNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return res.json();
};

// DELETE note
export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete note");
  }
};
