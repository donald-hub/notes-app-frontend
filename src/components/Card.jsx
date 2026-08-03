import styles from './Card.module.css';
import { formatDate } from '../lib/utils';
import { PenSquareIcon, TrashIcon, Pencil } from "lucide-react";
import {Link} from 'react-router-dom';
function Card({id, title, content, createdAt, onDelete}) {
    return (
        <div className={`${styles.card} bg-gray-300`}>
            <div className={styles.heading}>
                <h2 className="bg-gray-300">{title}</h2><span className={styles.actions}>
                <Link to={`/update/${id}`}><Pencil className={styles.edit}/></Link>
                <TrashIcon className={styles.delete} onClick={() => onDelete(id)}/>
            </span>
            </div>
            <div className={styles.content}>
                <p>{content}</p>
            </div>
            <div className={styles.footer}>
            <span className={styles.date}>{formatDate(createdAt)}</span>
            
            </div>
        </div>
    );
}
export default Card;