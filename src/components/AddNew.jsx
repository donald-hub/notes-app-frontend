import {Link} from 'react-router';
import styles from './AddNew.module.css';
import {IoIosAdd} from 'react-icons/io';

function AddNew() {
    return <div className={styles.addNote}>
        <IoIosAdd />
        </div>
}
export default AddNew