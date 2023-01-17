import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
  }

  const { lineItems } = req.body

  if (!lineItems) {
    return res
      .status(400)
      .json({ error: 'You must send the product lineItems.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
