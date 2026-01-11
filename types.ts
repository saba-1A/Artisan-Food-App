export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Chocolate' | 'Juice' | 'Box';
  image: string;
  tagline?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum RoutePath {
  Home = '/',
  Shop = '/shop',
  Subscription = '/subscription',
  About = '/about',
  Cart = '/cart',
  Box = '/box',
  Login = '/login',
  Signup = '/signup',
  Profile = '/profile',
  Checkout = '/checkout',
  SubscriptionCheckout = '/subscription-checkout',
  Tour = '/tour'
}