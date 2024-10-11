import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProductCategory } from './common/product-category';
import { ProductCategoryComponent } from './product-category/product-category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductListComponent,CommonModule ,RouterModule,SearchComponent,ProductCategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECommerce_frontend';
}
