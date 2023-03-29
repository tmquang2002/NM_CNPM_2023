import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Banner from '@/components/Banner/Banner'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.title}>
      <Banner/>
      </div>
  )
}


