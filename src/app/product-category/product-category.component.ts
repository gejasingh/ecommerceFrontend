

import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, RouterLinkActive, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../common/product-category';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,RouterLinkActive,RouterLink],
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Prduct Category Initialized')
    console.log('productCategories')
    this.route.paramMap.subscribe(() => {
      this.listProductCategories();
    });
  }

  listProductCategories(): void {
    this.productCategoryService.getProductCategories().subscribe(data => {
      this.productCategories = data;
    });
  }
}
