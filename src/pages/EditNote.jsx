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
        <div className={styles.authPage}>
        <div className={styles.header}>
          <Link to="/" className="flex"><ArrowLeftIcon className={styles.backIcon}/>
          <span className={styles.backTitle}>Back to Notes</span></Link>
        </div>
        <form className={`${styles.form} bg-gray-300`} onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-black font-xl">Title</label>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            placeholder="Title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content" className="text-black font-xl">Desription</label>
          <textarea
            className={styles.contentInput}
            value={content}
            placeholder="Content"
            id="content"
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={styles.submitButton} type="submit">Save</button>
        </form>
    </div>
    </div>
  )
}

export default EditNote