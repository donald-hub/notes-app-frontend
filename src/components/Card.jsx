import styles from './Card.module.css';
import { formatDate } from '../lib/utils';
import { PenSquareIcon, TrashIcon } from "lucide-react";
import {Link} from 'react-router-dom';
function Card({id, title, content, createdAt, onDelete}) {
    return (
        <div className="flex flex-col justify-content w-screen md:w-[300px] bg-sky-100 m-10 rounded-sm">
            <div className={styles.heading}>
                <h2 className="bg-gray-300">{title}</h2>
            </div>
            <div className={styles.content}>
                <p>{content}</p>
            </div>
            <div className={styles.footer}>
            <span className={styles.date}>{formatDate(createdAt)}</span>
            <span className={styles.actions}>
                <Link to={`/update/${id}`}><PenSquareIcon className={styles.edit}/></Link>
                <TrashIcon className={styles.delete} onClick={() => onDelete(id)}/>
            </span>
            </div>
        </div>
    );
}
export default Card;