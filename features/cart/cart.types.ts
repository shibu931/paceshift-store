export interface CartItem {
  productId: string;
  variantSku: string;
  quantity: number;
}

export interface CartItemDisplay {
  productId: string;
  variantSku: string;

  name: string;
  slug: string;

  image: string;

  variantLabel: string;

  price: number;
  comparePrice: number | null;

  quantity: number;

  lineTotal: number;

  availableQuantity: number;
  isAvailable: boolean;
}

export interface HydratedCart {
  items: CartItemDisplay[];

  invalidItems: CartItem[];

  summary: {
    subtotal: number;
    itemCount: number;
  };
}

export interface CartState {
  items: CartItem[];

  isCartOpen: boolean;

  addItem: (
    productId: string,
    variantSku: string,
    quantity?: number
  ) => void;

  buyNow: (
  productId: string,
  variantSku: string,
  quantity?: number
) => void;

  updateQuantity: (
    productId: string,
    variantSku: string,
    quantity: number
  ) => void;

  removeItem: (
    productId: string,
    variantSku: string
  ) => void;

  clearCart: () => void;

  getItemQuantity: (
    productId: string,
    variantSku: string
  ) => number;

  getItemCount: () => number;

  openCart: () => void;

  closeCart: () => void;

  setCartOpen: (open: boolean) => void;

  removeInvalidItems: (items: CartItem[]) => void;
}