import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product, ProductService} from '../../service/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.findProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      }
    });
  }
}
