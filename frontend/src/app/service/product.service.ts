import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_CONSTANTS} from '../constants';

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
  private apiUrl = `${API_CONSTANTS.RESOURCE_SERVER_URL}/products`;

  constructor(private http: HttpClient) {}

  findProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
