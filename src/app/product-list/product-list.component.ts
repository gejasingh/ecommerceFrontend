import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;  // Declare the searchMode property

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

              ngOnInit(): void {
                this.route.paramMap.subscribe(() => {
                  this.listProducts();
                });
              }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log("Search keyword: " + theKeyword);  // Debugging line
    this.productService.searchProduct(theKeyword).subscribe(data => {
      this.products = data;
    });
  }
  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // Get the category id and convert it into a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    // Fetch products by category
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(data => {
      this.products = data;
    });
  }

}