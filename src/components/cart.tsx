import { useContext, useState } from 'react'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'
import { Roboto } from '@next/font/google'
import * as Dialog from '@radix-ui/react-dialog'
import { CartContext } from '@contexts/cartContext'
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
import axios from 'axios'
import { priceFormatter } from '../utils/priceFormatter'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export function Cart() {
  const { items, removeItem } = useContext(CartContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const totalValue = items.reduce((acc, item) => {
    return (acc += item.unitAmount / 100)
  }, 0)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const lineItems = items.map((item) => {
        return {
          price: item.priceId,
          quantity: 1,
        }
      })

      const response = await axios.post('/api/checkout', {
        lineItems,
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao criar a sessão!')
    }
  }

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
              {items.map((item) => (
                <CartProduct key={item.priceId}>
                  <ImageContainer>
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={102}
                      height={102}
                    />
                  </ImageContainer>

                  <div>
                    <span>Camiseta Maratona Explorer 2</span>
                    <strong>R$ 79,00</strong>
                    <button
                      className={roboto.className}
                      onClick={() => removeItem(item.priceId)}
                    >
                      Remover
                    </button>
                  </div>
                </CartProduct>
              ))}
            </section>
          </ContentContainer>

          <TotalsContainer>
            <section>
              <div>
                <span>Quantidade</span>
                <span>{items.length}</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>{priceFormatter.format(totalValue)}</strong>
              </div>
            </section>

            <Button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </Button>
          </TotalsContainer>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
