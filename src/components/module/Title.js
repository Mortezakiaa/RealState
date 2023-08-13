import styles from './Title.module.css'
export default function Title({children}) {
    return <h3 className={styles.title}>{children}</h3>;
}
