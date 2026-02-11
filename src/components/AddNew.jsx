import {Link} from 'react-router';
import styles from './AddNew.module.css';

function AddNew() {
    return <div className={styles.addNote}>
        <Link to="/create" className={styles.addButton}>+</Link>
        </div>
}
export default AddNew