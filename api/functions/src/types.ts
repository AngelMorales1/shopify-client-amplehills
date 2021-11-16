export type FlavorFrenzyVote = {
  _createdAt: Date;
  _id: string;
  flavorFrenzy: string;
  round: string;
  match: string;
  flavor: string;
};


export type ShippingRate = {
  service_name: string;
  service_code: string;
  description: string;
  currency: string;
  total_price: number;
}

export type ShopifyRateItem = {
  name: string;
  sku: string;
  quantity: number;
  grams: number;
  price: number;
  vendor: string;
  requires_shipping: boolean;
  taxable: boolean;
  fulfillment_service: string;
  properties: unknown;
  product_id: string | number;
  variant_id: string | number;
}

export type Product = {
  title: string;
  productType: string;
}
