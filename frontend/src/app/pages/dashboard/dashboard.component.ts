import {Component} from '@angular/core';
import {ResourceService} from '../../service/resource.service';
import {OAuthServiceConfig} from '../../service/oauth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductsComponent} from '../products/products.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ProductsComponent],
  standalone: true,
  template: `
    <header class="bg-slate-50 h-20 shadow-md flex items-center justify-between px-6">
      <h1 class="text-2xl font-semibold text-gray-800">Welcome {{username}}</h1>
      <button (click)="logout()" class="bg-gray-800 text-white hover:bg-gray-700 border mb-2 py-2 px-6 rounded-lg transition duration-300">
        Logout
      </button>
    </header>

    <app-products></app-products>

  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DashboardComponent {

  username: string = '';

  constructor(
    private resourceService: ResourceService,
    private oauthService: OAuthServiceConfig,
  ) {
    const claims = this.oauthService.getIdentityClaims()
    this.username = claims?.sub || "User"

    // resourceService.getWelcomeMessage()
    //   .subscribe(
    //     (data) => this.message = data.message,
    //     error => console.log(error)
    //   )
  }

  logout() {
    this.oauthService.logout()
  }
}
