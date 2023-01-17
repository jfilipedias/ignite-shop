import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { Roboto } from '@next/font/google'
import logoImg from '../assets/logo.svg'
import { globalStyles } from '@styles/global'
import { Container } from '@styles/pages/app'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
