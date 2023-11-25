import Link from 'next/link';
import styles from './header.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    RIWASU
                </div>
                <div className={styles.headerItems}>
                    <Link href={"#"}>Trang chủ</Link>
                    <Link href={"#"}>Sản phẩm</Link>
                    <Link href={"#"}>Giới thiệu</Link>
                    <Link href={"#"}>Tin tức</Link>
                    <Link href={"#"} className={styles["vertically-align-center"]}>
                        <AddShoppingCartIcon></AddShoppingCartIcon>
                    </Link>
                </div>
            </div>
        </>
    )
}