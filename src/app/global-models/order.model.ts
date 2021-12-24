export interface IOrderTableEntity {
  order_id: string;
  user_id: number;
  price: string;
  delivery_price: string;
  total: string;
  created_on: string;
  email: string;
  address: string;
}
export interface OrderDetails {
  order_id: string;
  user_id: number;
  price: string;
  delivery_price: string;
  total: string;
  created_on: string;
  email: string;
  address: string;
}
export interface OrderItemsEntity {
  od_id: number;
  order_id: string;
  name: string;
  image: string;
  product_price: string;
  quantity: number;
  delivery_price: string;
  category: string;
  description: string;
}
