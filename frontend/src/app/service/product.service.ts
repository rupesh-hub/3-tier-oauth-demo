import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  mediumDescription: string;
  category: {
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8181/products';

  constructor(private http: HttpClient) {}

  findProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
