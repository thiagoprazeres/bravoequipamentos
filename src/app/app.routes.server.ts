import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sobre-a-bravo', renderMode: RenderMode.Prerender },
  { path: 'containers', renderMode: RenderMode.Prerender },
  { path: 'clientes', renderMode: RenderMode.Prerender },
  { path: 'fale-conosco', renderMode: RenderMode.Prerender },
  { path: 'stand-de-vendas', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client }
];
