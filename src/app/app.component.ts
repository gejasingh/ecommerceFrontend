import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CommonModule, RouterModule, SearchComponent, ProductCategoryComponent, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // corrected from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'ECommerce_frontend';
  cartQuantity = 0;
  cartTotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.totalQuantity$.subscribe(
      (quantity) => this.cartQuantity = quantity
    );
    this.cartService.totalPrice$.subscribe(
      (totalPrice) => this.cartTotal = totalPrice
    );
  }
}

