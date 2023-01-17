import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import { Header } from '@components/header'
import { CartContextProvider } from '@contexts/cartContext'
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
      <CartContextProvider>
        <Header />

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
