import Header from '../components/header/header';
import styles from './layout.module.css';

export default function Layout({ children }) {
    return <div className={styles.container}>
        <Header></Header>
        {children}
    </div>;
}