import {Link} from 'react-router';
import styles from './AddNew.module.css';

function AddNew() {
    return 
    <>
    <div className="bg-gray-300">
        <div className={styles.addNote}>
        <Link to="/create" className={styles.addButton}>+</Link>
        </div>
    </div>
    </>
}
export default AddNew