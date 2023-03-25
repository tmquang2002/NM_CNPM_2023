import styles from './header.module.css'
import { fbIcon, searchIcon, instaIcon } from '@/assets/svgs'
import Image from 'next/image'
export default function Header () {

    // react 


    return (
        <div className={styles.header}>
            <p>Header</p>
            <Image src={searchIcon} alt={''} className={styles.icon} />
        </div>
    )
}