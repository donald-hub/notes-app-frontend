import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './createPage.module.css';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { ArrowLeftIcon} from 'lucide-react';
import { getNoteById, updateNote } from "../services/notes";


const EditNote = () => {
  const { id } = useParams();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const navigate = useNavigate();
  // find a note by its id
  useEffect(() => {
  const loadNote = async () => {
    try {
      const data = await getNoteById(id);
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  if (id) loadNote();
}, [id]);

  
// HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim()) return;

  try {
    await updateNote(id, { title, content });
    navigate("/");
  } catch (err) {
    console.error("Update failed", err);
  }
};

  return (
    <div>

        <Navbar />
        <div className={styles.header}>
          <Link to="/" ><ArrowLeftIcon className={styles.backIcon}/></Link>
          <span className={styles.backTitle}>Back to Notes</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            placeholder="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.contentInput}
            value={content}
            placeholder="Content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={styles.submitButton} type="submit">Save</button>
        </form>
    </div>
  )
}

export default EditNote