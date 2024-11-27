import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {provideEffects} from '@ngrx/effects';
import {TaskEffects} from "./+state/task.effects";
import {STATE_PROVIDERS} from "./+state/feature-state.providers";
import {jwtInterceptor } from "./jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    // Setup root store
    provideStore(),
    // Global store setup (not used as I go with feature stores...)
    // provideStore({
    //   [FEATURE_KEY]: itemReducer
    // }),
    provideEffects([TaskEffects]),
    // Wire up feature stores
    STATE_PROVIDERS,
    // Link router store
    provideState({name: 'router', reducer: routerReducer}),
    provideRouterStore({}),
    provideStoreDevtools({}),
    provideHttpClient(
      withInterceptors([ jwtInterceptor ]),
    ),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
  ]
};



