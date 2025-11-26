import { Injectable } from "@angular/core";
import { OAuthService, AuthConfig, OAuthErrorEvent } from "angular-oauth2-oidc";
import { filter } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class OAuthServiceConfig {

  constructor(private oauth: OAuthService) {}

  async setupOAuth(): Promise<void> {
    console.log("OAuthServiceConfig Loaded...");

    // FOR LOCAL
    // const authConfig: AuthConfig = {
    //   issuer: 'http://localhost:9000',
    //   clientId: 'purely-goods-ac-pkce',
    //   redirectUri: 'http://localhost:8080/callback',
    //   responseType: 'code',
    //   scope: 'openid profile email',
    //   showDebugInformation: true,
    //   requireHttps: false,  // localhost
    // };

    const authConfig: AuthConfig = {
      issuer: 'http://localhost:9000',
      clientId: 'purely-goods-ac-pkce',
      redirectUri: `http://localhost:8080/callback`,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
      requireHttps: false,  // only if not using HTTPS!
    };


    this.oauth.configure(authConfig);
    this.oauth.postLogoutRedirectUri = `${window.location.origin}/login`;
    this.oauth.setStorage(localStorage);

    await this.oauth.loadDiscoveryDocumentAndTryLogin();

    this.oauth.events
      .pipe(filter((e) => e instanceof OAuthErrorEvent))
      .subscribe(e => console.error("OAuth error:", e));

    this.oauth.events.subscribe(e =>
      console.log("OAuth event:", e.type)
    );
  }

  login() {
    this.oauth.initCodeFlow();
  }

  logout() {
    this.oauth.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  getIdentityClaims(): any {
    return this.oauth.getIdentityClaims();
  }

  getAccessToken(): string {
    return this.oauth.getAccessToken() || "";
  }
}
