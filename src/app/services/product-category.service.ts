import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) { }

  // Define the getProductCategories method
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.apiUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }
}

// Interface for mapping the response
interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  };
}
