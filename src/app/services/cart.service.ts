import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../common/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);
  
  cartItems$ = this.cartItemsSubject.asObservable();
  totalQuantity$ = this.totalQuantitySubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {}

  /**
   * Adds an item to the cart.
   * If the item already exists, its quantity is incremented.
   * 
   * @param product - The cart item to add.
   */
  addToCart(product: CartItem) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ ...product, quantity: 1 });
    }

    // Update the cart items in the BehaviorSubject
    this.cartItemsSubject.next(currentItems); 
    this.updateCartTotals();
  }

  /**
   * Removes an item from the cart by its ID.
   * 
   * @param id - The ID of the item to remove.
   */
  removeFromCart(id: number): void {
    const updatedItems = this.cartItemsSubject.getValue().filter(item => item.id !== id);
    this.cartItemsSubject.next(updatedItems); // Update the cart items
    this.updateCartTotals();
  }

  /**
   * Updates the total price and quantity based on the current cart items.
   */
  private updateCartTotals() {
    const currentItems = this.cartItemsSubject.getValue();
    const totalQuantity = this.getTotalQuantity(currentItems);
    const totalPrice = this.getTotalPrice(currentItems);

    // Update the total quantity and price in their respective BehaviorSubjects
    this.totalQuantitySubject.next(totalQuantity);
    this.totalPriceSubject.next(totalPrice);
  }

  /**
   * Calculates the total price of the cart items.
   * 
   * @param items - The current cart items.
   * @returns The total price.
   */
  public getTotalPrice(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  /**
   * Calculates the total quantity of the cart items.
   * 
   * @param items - The current cart items.
   * @returns The total quantity.
   */
  public getTotalQuantity(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Gets the current cart items.
   * 
   * @returns The current cart items as an array.
   */
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * 
   * @param id - The ID of the item.
   * @param quantity - The new quantity of the item.
   */
  updateItemQuantity(id: number, quantity: number) {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find(cartItem => cartItem.id === id);

    if (item) {
      item.quantity = quantity; // Update the item's quantity
      this.cartItemsSubject.next(currentItems); // Update the cart items
      this.updateCartTotals(); // Recalculate totals
    }
  }
}
