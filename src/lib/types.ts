export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
