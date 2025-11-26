import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, RegisterRequest} from '../../service/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p class="text-gray-600 mb-8">Sign up to get started</p>

        <form (ngSubmit)="register()" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              [(ngModel)]="formData.firstName"
              name="firstName"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="John"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              [(ngModel)]="formData.lastName"
              name="lastName"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Doe"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              [(ngModel)]="formData.email"
              name="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              [(ngModel)]="formData.password"
              name="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <div *ngIf="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {{ error }}
        </div>

        <p class="text-center text-gray-600 text-sm mt-6">
          Already have an account?
          <a routerLink="/login" class="text-indigo-600 hover:underline font-semibold">Sign In</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
    }
  `,
  ],
})
export class RegisterComponent {

  formData: RegisterRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  }
  isLoading = false
  error: string | null = null

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.isLoading = true
    this.error = null

    this.authService.register(this.formData).subscribe({
      next: () => {
        this.router.navigate(["/login"])
      },
      error: (err) => {
        this.error = err.error?.message || "Registration failed"
        this.isLoading = false
      },
    })
  }

}
