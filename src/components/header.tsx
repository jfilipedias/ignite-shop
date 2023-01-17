import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@assets/logo.svg'
import { HeaderContainer } from '@styles/components/header'
import { Cart } from './cart'

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  )
}
