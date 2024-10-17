import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service'; // Make sure to import CartService

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'], // Fixed the typo here
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService // Inject the CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // Get id param value and call service method
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  // Add to Cart button handling method
  addToCart(product: Product) {
    console.log('Product that you clicked:', product); // Fixed console log statement
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      unitPrice: product.unitPrice,
      imageUrl: product.imageUrl, // Fixed the property reference
      quantity: 1,
    });
  }
}
