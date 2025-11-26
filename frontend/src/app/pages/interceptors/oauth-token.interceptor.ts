import type { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { OAuthService } from "angular-oauth2-oidc"

export const oauthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const oauthService = inject(OAuthService)
  const accessToken = oauthService.getAccessToken()

  if (accessToken && !req.url.includes("/oauth2/token")) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  return next(req)
}
