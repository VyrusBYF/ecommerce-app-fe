import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { CartItem, Product } from "src/_shared/sharedTypes";
import { Cart } from "./Cart";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

interface IShoppingCartProviderProps {
  children: ReactNode;
}

interface IShoppingCartContext {
  addToCart?: (product: Product) => void;
  cartItems: CartItem[];
  decreaseItemQuantity?: (id: number) => void;
  getItemByID?: (id: number) => CartItem;
  getItemQuantity?: (id: number) => number;
  increaseItemQuantity?: (id: number) => void;
  isCartEmpty: boolean;
  removeFromCart?: (id: number) => void;
  showCart: boolean;
  showToggle: (close?: boolean) => void;
}

export const ShoppingCartContext = createContext<IShoppingCartContext>(null);

export const useShoppingCart = (): IShoppingCartContext => useContext(ShoppingCartContext);

export const ShoppingCartProvider = (props: IShoppingCartProviderProps): JSX.Element => {
  const { children } = props;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cookies, setCookie] = useCookies(["Cart"]);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    setCookie("Cart", cartItems, { path: "/" });
    setIsCartEmpty(cartItems.length < 1);
  }, [cartItems]);

  useEffect(() => {
    setCartItems(cookies.Cart ?? []);
  }, []);

  const checkCart = (id: number) => cartItems.findIndex(item => item.ProductID === id);

  const addToCart = (product: Product) => {
    if (checkCart(product.ProductID) < 0) {
      setCartItems([...cartItems, { ...product, Quantity: 1 }]);
    }
    increaseItemQuantity(product.ProductID);
    toast.success(`${getItemByID(product.ProductID)?.Name ?? "Item"} was added from cart`);
  };

  const getItemByID = (id: number) => {
    if (checkCart(id) < 0) {
      return null;
    }
    return cartItems.find(item => item.ProductID === id);
  };

  const decreaseItemQuantity = (id: number) => {
    if (checkCart(id) < 0) {
      return;
    }
    const currentProduct = checkCart(id);
    const newCartItems = [...cartItems];
    if (newCartItems[currentProduct].Quantity <= 1) {
      return;
    }
    newCartItems[currentProduct].Quantity -= 1;
    setCartItems(newCartItems);
  };

  const getItemQuantity = (id: number) => {
    if (checkCart(id) < 0) {
      return 0;
    }
    return cartItems[checkCart(id)].Quantity;
  };

  const increaseItemQuantity = (id: number) => {
    if (checkCart(id) < 0) {
      return;
    }
    const currentProduct = checkCart(id);
    const newCartItems = [...cartItems];
    newCartItems[currentProduct].Quantity += 1;
    setCartItems(newCartItems);
  };

  const removeFromCart = (id: number) => {
    if (checkCart(id) < 0) {
      return;
    }
    setCartItems([...cartItems.filter(item => item.ProductID !== id)]);
    toast.error(`${getItemByID(id)?.Name ?? "Item"} was removed from cart`);
  };

  const showToggle = (close?: boolean) => {
    if (close) {
      setShowCart(false);
      return;
    }
    setShowCart(!showCart);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        cartItems,
        decreaseItemQuantity,
        getItemQuantity,
        increaseItemQuantity,
        isCartEmpty,
        removeFromCart,
        showCart,
        showToggle
      }}>
      {children}
      <Cart />
    </ShoppingCartContext.Provider>
  );
};
