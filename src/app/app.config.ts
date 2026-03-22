import { ApplicationConfig } from '@angular/core';
import { provideRouter, TitleStrategy, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
