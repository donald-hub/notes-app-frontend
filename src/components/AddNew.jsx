import {Link} from 'react-router';
import styles from './AddNew.module.css';
import { IoAddCircle } from "react-icons/io5";

function AddNew() {
    return <div className={styles.addNote}>
        <Link to="/create" className={styles.addButton}><IoAddCircle color="gold" size="60"/></Link>
        </div>
}
export default AddNew