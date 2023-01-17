import Link from 'next/link'
import { NotFoundContainer } from '@styles/pages/404'

export default function NotFound() {
  return (
    <NotFoundContainer>
      <h1>Página não encontrada</h1>

      <Link href="/">Voltar ao catálogo</Link>
    </NotFoundContainer>
  )
}
