import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '@libs/stripe'
import { ImageContainer, SuccessContainer } from '@styles/pages/success'

interface SuccessProps {
  customerName: string
  productImageUrls: string[]
}

export default function Success({
  customerName,
  productImageUrls,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <div>
          {productImageUrls.map((imageUrl) => (
            <ImageContainer key={imageUrl}>
              <Image src={imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </div>

        <p>
          Uhuul <strong>{customerName}</strong>, seu pedido já está a caminho da
          sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
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
  const products = session.line_items?.data.map((item) => {
    return item.price?.product as Stripe.Product
  })
  const productImageUrls = products?.map((product) => product.images[0])

  return {
    props: {
      customerName,
      productImageUrls,
    },
  }
}
