import { Handbag, X } from 'phosphor-react'
import { Roboto } from '@next/font/google'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@styles/components/button'
import {
  CartClose,
  CartContent,
  CartProduct,
  CartTitle,
  CartTrigger,
  ContentContainer,
  ImageContainer,
  TotalsContainer,
} from '@styles/components/cart'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export function Cart() {
  return (
    <Dialog.Root>
      <CartTrigger>
        <Handbag size={24} weight="bold" />
      </CartTrigger>

      <Dialog.Portal>
        <CartContent className={roboto.className}>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <ContentContainer>
            <CartTitle>Sacola de compras</CartTitle>

            <section>
              <CartProduct>
                <ImageContainer></ImageContainer>

                <div>
                  <span>Camiseta Maratona Explorer 2</span>
                  <strong>R$ 79,00</strong>
                  <button className={roboto.className}>Remover</button>
                </div>
              </CartProduct>
            </section>
          </ContentContainer>

          <TotalsContainer>
            <section>
              <div>
                <span>Quantidade</span>
                <span>3</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>R$ 270,00</strong>
              </div>
            </section>

            <Button>Finalizar compra</Button>
          </TotalsContainer>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
