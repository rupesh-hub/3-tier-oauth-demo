import {Component} from "@angular/core"
import {CommonModule} from "@angular/common"
import {RouterModule} from "@angular/router"
import {OAuthService} from "angular-oauth2-oidc"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">OAuth2 Demo</h1>
        <p class="text-gray-600 mb-8">Login using Authorization Code with PKCE</p>

        <div class="space-y-6">
          <button
            (click)="loginWithOAuth()"
            class="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Login with OAuth2
          </button>

          <p class="text-center text-sm text-gray-500">
            This uses Authorization Code Flow with PKCE for secure authentication.
          </p>

          <!-- Debug Message (only visible when there's a debug message) -->
          <div *ngIf="debugMessage" class="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-sm">
            {{ debugMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  debugMessage = ""

  constructor(private oauthService: OAuthService) {
    console.log("[v0] LoginComponent initialized")

    console.log("[v0] OAuthService instance:", this.oauthService)
  }

  loginWithOAuth() {
    console.log("[v0] Login button clicked")
    try {
      this.debugMessage = "Redirecting to authorization server..."
      console.log("[v0] OAuth config:", this.oauthService.clientId)
      console.log("[v0] Calling initCodeFlow()...")
      this.oauthService.initCodeFlow()
    } catch (error) {
      console.error("[v0] Login error:", error)
      this.debugMessage = `Error: ${JSON.stringify(error)}`
    }
  }
}
