import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {provideEffects} from '@ngrx/effects';
import {TaskEffects} from "./+state/task/task.effects";
import {STATE_PROVIDERS} from "./+state/feature-state.providers";
import {jwtInterceptor} from "./jwt.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {UserEffects} from "./+state/user/user.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      })
    ),
    // Setup root store
    provideStore(),
    // Global store setup (not used as I go with feature stores...)
    // provideStore({
    //   [FEATURE_KEY]: itemReducer
    // }),
    provideEffects([TaskEffects, UserEffects]),
    // Wire up feature stores
    STATE_PROVIDERS,
    // Link router store
    provideState({name: 'router', reducer: routerReducer}),
    provideRouterStore({}),
    provideStoreDevtools({}),
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
    ),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
  ]
};



