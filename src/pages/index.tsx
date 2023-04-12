import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <header className='flex justify-center'>
        <h1>Next.js Template</h1>
      </header>
    </main>
  )
}
