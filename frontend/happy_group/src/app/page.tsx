import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Header from '@/components/header/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.title}>
      <Header/>
      <p>hello world</p></div>
      <p>hello </p>

  )
}
