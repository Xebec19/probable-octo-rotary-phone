export interface IProducts {
  id: number;
  productName: string;
  productImage: string;
  quantity?: number;
  category?: string;
  createdOn?: string;
  updatedOn?: string;
  status?: string;
  price: string;
  deliveryPrice: string;
  productDescription: string;
  country?: string;
  totalProducts?: number;
}
