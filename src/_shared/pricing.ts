// Must be a number between 0 and 1
export const globalDiscount = 1 - 0.2;
export const applyDiscount = globalDiscount > 0 && globalDiscount < 1;

export const globalMinPrice = 0.99;
export const globalMaxPrice = 10000;
