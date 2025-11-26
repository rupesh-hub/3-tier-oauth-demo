import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Component({
  selector: "app-callback",
  template: "<p>Signing you in...</p>",
  standalone: true
})
export class CallbackComponent implements OnInit {
  constructor(private oauth: OAuthService, private router: Router) {}

  async ngOnInit() {
    await this.oauth.tryLoginCodeFlow();
    await this.router.navigate(["/dashboard"]);
  }
}
