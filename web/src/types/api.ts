interface BaseApiResponse {
  createdAt: string;
  updatedAt: string;
}

export interface Product extends BaseApiResponse {
  id: number;
  name: string;
  price: number;
}

export interface Stock extends BaseApiResponse {
  id: string;
  quantity: number;
}

export interface ProductWithStock extends Product {
  stock: Stock;
}
