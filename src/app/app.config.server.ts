import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering as provideNodePlatform } from '@angular/platform-server';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideNodePlatform(),
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const AppServerConfig = mergeApplicationConfig(appConfig, serverConfig);
