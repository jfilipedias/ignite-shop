import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Stripe from 'stripe'
import { stripe } from '@libs/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '@styles/pages/product'
import { priceFormatter } from '@utils/priceFormatter'

interface ProductProps {
  name: string
  imageUrl: string
  price: string
  description: string
  priceId: string
}

export default function Product({
  name,
  imageUrl,
  price,
  description,
  priceId,
}: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao criar a sessão!')
    }
  }

  return (
    <>
      <Head>
        <title>{name} | Ignite Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetail>
          <h1>{name}</h1>
          <span>{price}</span>

          <p>{description}</p>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Comprar agora
          </button>
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
      imageUrl: product.images[0],
      price: priceFormatter.format(Number(price.unit_amount) / 100),
      description: product.description,
      priceId: price.id,
    },
    revalidate: 60 * 60 * 1, // 1 hour in seconds
  }
}
