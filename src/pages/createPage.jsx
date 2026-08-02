import { ArrowLeftIcon } from 'lucide-react';
import {useState} from 'react';
import styles from './createPage.module.css';
import {Link} from 'react-router';
import Navbar from '../components/Navbar';
import toast from "react-hot-toast";
import {createNote} from "../services/notes";
import { useNavigate } from 'react-router-dom';

const createPage = () => {
  const [notes, setNotes] = useState([]);
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const navigate = useNavigate();

  // ADD NEW NOTE
    const addNote = async (noteData) => {
    try {
      const savedNote = await createNote(noteData);

      // 👇 update UI instantly
      setNotes(prevNotes => [savedNote, ...prevNotes]);
      toast.success("New Note created successfully!");
      navigate("/"); // Redirect to home page after creation
    } catch (error) {
      console.error("Error creating note", error);
    }
  };
  
// HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const newNote = {title, content};

    addNote(newNote);

    // reset form
    setTitle("");
    setContent("");
  }
  return (
    <>
    <Navbar />
    <div className={styles.authPage}>
    <div className={styles.header}>
      <Link to="/" ><ArrowLeftIcon className={styles.backIcon}/></Link>
      <span className={styles.backTitle}>Back to Notes</span>
    </div>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="flex flex-col">
      <label htmlFor="title" className="text-black font-xl">Title</label>
      <input
        className={styles.titleInput}
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      </div>
      <div className="flex flex-col">
      <label htmlFor="content" className="text-black font-xl">Description</label>
      <textarea
        className={styles.contentInput}
        id="content"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      </div>
      <button className={styles.submitButton} type="submit">Save</button>
    </form>
    </div>
    </>
  )
}

export default createPage