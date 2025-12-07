import { Injectable } from "@angular/core"
import { type AuthConfig, OAuthErrorEvent, type OAuthService } from "angular-oauth2-oidc"
import { filter } from "rxjs/operators"
import { API_CONSTANTS } from "../constants"

@Injectable({ providedIn: "root" })
export class OAuthServiceConfig {
  constructor(private oauth: OAuthService) {}

  async setupOAuth(): Promise<void> {
    console.log("OAuthServiceConfig Loaded...")

    const authConfig: AuthConfig = {
      issuer: `${API_CONSTANTS.AUTHORIZATION_SERVER_URL}`,
      clientId: `${API_CONSTANTS.CLIENT_ID}`,
      redirectUri: `${API_CONSTANTS.CALLBACK_URL}`,
      responseType: "code",
      scope: "openid profile email",
      showDebugInformation: true,
      requireHttps: false,
      skipIssuerCheck: false, // Disable issuer check temporarily for debugging - MUST be enabled in production with proper HTTP/HTTPS setup
      strictDiscoveryDocumentValidation: false, // Allow discovery document URLs to be more flexible
    }

    this.oauth.configure(authConfig)
    this.oauth.postLogoutRedirectUri = `${window.location.origin}/login`
    this.oauth.setStorage(localStorage)

    await this.oauth.loadDiscoveryDocumentAndTryLogin()

    this.oauth.events
      .pipe(filter((e) => e instanceof OAuthErrorEvent))
      .subscribe((e) => console.error("OAuth error:", e))

    this.oauth.events.subscribe((e) => console.log("OAuth event:", e.type))
  }

  login() {
    this.oauth.initCodeFlow()
  }

  logout() {
    this.oauth.logOut()
  }

  isLoggedIn(): boolean {
    return this.oauth.hasValidAccessToken()
  }

  getIdentityClaims(): any {
    return this.oauth.getIdentityClaims()
  }

  getAccessToken(): string {
    return this.oauth.getAccessToken() || ""
  }
}
