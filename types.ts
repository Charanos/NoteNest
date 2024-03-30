import Stripe from "stripe";

export interface UserDetails {
  id: string;
  last_name: string;
  first_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  id: string;
  name?: string;
  image?: string;
  active?: boolean;
  description?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  active?: string;
  currency?: string;
  products?: Product;
  product_id?: string;
  description?: string;
  unit_amount?: number;
  interval_count?: number;
  type?: Stripe.Price.Type;
  metadata?: Stripe.Metadata;
  trial_period_days?: number | null;
  interval?: Stripe.Price.Recurring.Interval;
}

export interface Subscription {
  id: string;
  prices?: Price;
  user_id: string;
  created: string;
  ended_at?: string;
  quantity?: number;
  price_id?: string;
  trial_end?: string;
  cancel_at?: string;
  trial_start?: string;
  canceled_at?: string;
  metadata?: Stripe.Metadata;
  current_period_end: string;
  current_period_start: string;
  cancel_at_period_end?: boolean;
  status?: Stripe.Subscription.Status;
}
