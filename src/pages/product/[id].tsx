import { useContext } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '@libs/stripe'
import { Button } from '@styles/components/button'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '@styles/pages/product'
import { priceFormatter } from '@utils/priceFormatter'
import { CartContext } from '../../contexts/cartContext'

interface ProductProps {
  name: string
  description: string
  imageUrl: string
  priceId: string
  unitAmount: number
}

export default function Product({
  name,
  description,
  imageUrl,
  priceId,
  unitAmount,
}: ProductProps) {
  const { addItem } = useContext(CartContext)

  function handleAddToCart() {
    addItem({
      name,
      imageUrl,
      priceId,
      unitAmount,
    })
  }

  return (
    <>
      <Head>
        <title>{`${name} | Ignite Shop`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetail>
          <h1>{name}</h1>
          <span>{priceFormatter.format(Number(unitAmount) / 100)}</span>

          <p>{description}</p>

          <Button onClick={handleAddToCart}>Comprar agora</Button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list({ active: true })
  const products = response.data
  const paths = products.map((product) => {
    return {
      params: {
        id: product.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      priceId: price.id,
      unitAmount: price.unit_amount,
    },
    revalidate: 60 * 60 * 1, // 1 hour in seconds
  }
}
