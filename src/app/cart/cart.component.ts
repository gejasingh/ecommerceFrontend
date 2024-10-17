import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../common/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true, // Add this
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalQuantity = this.cartService.getTotalQuantity(items);  // Passing the items here
      this.totalPrice = this.cartService.getTotalPrice(items);        // Passing the items here
    });
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }

  updateItemQuantity(id: number, quantity: number): void {
    this.cartService.updateItemQuantity(id, quantity);
  }
}
