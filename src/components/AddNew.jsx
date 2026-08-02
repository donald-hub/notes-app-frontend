import {Link} from 'react-router';
import styles from './AddNew.module.css';
import { IoIosAdd } from "react-icons/io";

function AddNew() {
    return <div className={styles.addNote}>
        <Link to="/create" className={styles.addButton}><IoIosAdd /></Link>
        </div>
}
export default AddNew