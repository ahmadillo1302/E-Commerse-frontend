export interface UserInterfaces {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
}

export interface CategoryInterfaces {
  id: string;
  name: string;
}
export interface ProductInterfaces {
  id: string;
  name: string;
  price: number;
  category: CategoryInterfaces;
  images: {
    id: string;
    image_url: string;
  }[];
}
export interface ProductImageInterfaces {
  id: string;
  product: ProductInterfaces;
  image_url: string;
}

export interface ReviewInterfaces {
  id: string;
  user: UserInterfaces;
  product: ProductInterfaces;
  comment: string;
  rating: number;
  created_at: string;
}

export interface ProductCardProps {
  product: ProductInterfaces;
  reviews: ReviewInterfaces[];
  user?: { id: string; email: string } | null;
}
export interface CartInterfaces {
  id: string;
  user: UserInterfaces;
}
export interface CartItemInterfaces {
  id: string;
  cart: CartInterfaces;
  product: ProductInterfaces;
  quantity: number;
  price: number;
}
export interface OrderInterfaces {
  id: string;
  user: UserInterfaces;
}
