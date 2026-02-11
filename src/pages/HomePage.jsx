import styles from './HomePage.module.css'; 
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import AddNew from '../components/AddNew';
import { getNotes, deleteNote } from "../services/notes";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setError(null);
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError("Could not load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  },[]);

  // DELETE NOTE
  const handleDelete = async (id) => {
  try {
    await deleteNote(id);
    setNotes(prev => prev.filter(note => note._id !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  return (
    <>
    <Navbar/>
    <Cards>
  {loading && <p>Loading notes...</p>}

  {!loading && error && (
    <p className={styles.error}>{error}</p>
  )}

  {!loading && !error && notes.length === 0 && (
    <p>No notes yet. Click + to add one ✨</p>
  )}

  {!loading && !error && notes.map(note => (
    <Card
      key={note._id}
      id={note._id}
      title={note.title}
      content={note.content}
      createdAt={note.createdAt}
      onDelete={handleDelete}  
    />
  ))}
</Cards>


    <AddNew/>
    </>
  )
}

export default HomePage