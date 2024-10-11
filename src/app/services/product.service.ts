import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl= "http://localhost:8081/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductsByCategory(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProduct(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search/findByNameContaining?keyword=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }
  

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl)
                          .pipe(map(response => response._embedded.products));
  }

  getProduct(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.apiUrl)
                          .pipe(map(response => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
