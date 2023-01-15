import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  productImageUrl: string
}

export default function Success({
  customerName,
  productImageUrl,
}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={productImageUrl} alt="" width={120} height={110} />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, seu pedido já está a caminho da
        sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      productImageUrl: product.images[0],
    },
  }
}
