'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { catchAsync, deepCloneObject } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredit } from './user.actions';

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = transaction.amount * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credit: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
  });

  redirect(session.url!);
}

export const createTransaction = catchAsync(
  async (transaction: CreateTransactionParams) => {
    await connectToDatabase();

    const createdTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredit(transaction.buyerId, transaction.credits);

    return deepCloneObject(createdTransaction);
  }
);
