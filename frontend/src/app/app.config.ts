import {APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideOAuthClient} from 'angular-oauth2-oidc';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {oauthTokenInterceptor} from './pages/interceptors/oauth-token.interceptor';
import { OAuthServiceConfig } from './service/oauth.service';

export function initOAuth() {
  const oauth = inject(OAuthServiceConfig);
  return () => oauth.setupOAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideOAuthClient(),
    provideHttpClient(withInterceptors([oauthTokenInterceptor])),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initOAuth,
      deps: [],
      multi: true
    }
  ]
};
