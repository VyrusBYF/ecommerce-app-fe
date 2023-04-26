export class Nameable {
  Name: string;

  Description?: string;
}

export class Product extends Nameable {
  Category: string;

  ImageUrl: string;

  Price: number;

  ProductID: number;

  ProductUrl: string;
}

export class CartItem extends Product {
  Quantity: number;

  DiscountedPrice?: number;
}

export class Filter extends Nameable {
  FilterType: string;
}
