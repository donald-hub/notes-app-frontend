import styles from './Cards.module.css';

function Cards({children}) {
    return(
        <div className={styles.cards}>
        {children}
        </div>
    )
}
export default Cards;