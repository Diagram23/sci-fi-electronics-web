import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, email, isBundle } = req.body;

  // Mapea IDs a Price IDs de Stripe
  const priceIds: Record<string, string> = {
    'quantum-reverb': 'price_xxx', // Reemplaza con tus Price IDs reales
    'fractal-delay': 'price_yyy',
    'spectral-gate': 'price_zzz',
    'plasma-distortion': 'price_aaa',
    'bundle': 'price_bbb',
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: items.map((item: any) => ({
        price: isBundle ? priceIds['bundle'] : priceIds[item.id],
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/plugins`,
      metadata: {
        items: JSON.stringify(items.map((i: any) => i.id)),
        email: email,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}