import Head from 'next/head'
import Link from 'next/link'
import { NotFoundContainer } from '@styles/pages/404'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página não encontrada | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <NotFoundContainer>
        <h1>Página não encontrada</h1>

        <Link href="/">Voltar ao catálogo</Link>
      </NotFoundContainer>
    </>
  )
}
