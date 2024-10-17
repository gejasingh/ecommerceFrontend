import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../common/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true, // Add this
  imports: [CommonModule], // Only valid with standalone components
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateCartTotals();
    });
  }

  updateCartTotals() {
    this.totalQuantity = this.cartService.getTotalQuantity(this.cartItems);
    this.totalPrice = this.cartService.getTotalPrice(this.cartItems);
    
  }
  proceedToCheckout() {
    console.log('Proceeding to checkout...');
    // Additional logic for checkout can be added here
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }
}
