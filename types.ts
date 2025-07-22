export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  category: 'Meals' | 'Sides' | 'Snacks' | 'Drinks';
  calories: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export type Screen = 'auth' | 'menu' | 'detail' | 'cart' | 'chat' | 'profile' | 'favorites' | 'home' | 'payment';