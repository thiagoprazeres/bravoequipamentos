import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-bravo-navy flex flex-col items-center justify-center px-6 text-center">
      <img src="/logos/logo-fundo_azul.svg" alt="Bravo Equipamentos" class="h-14 mb-12 opacity-90">

      <p class="text-bravo-yellow text-sm font-bold uppercase tracking-widest mb-4">Erro 404</p>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 leading-none">Página não encontrada</h1>
      <p class="text-white/60 text-lg max-w-md mb-10">
        O endereço que você acessou não existe ou foi movido. Volte para o início e encontre o que precisa.
      </p>

      <a routerLink="/"
         class="inline-flex items-center gap-3 bg-bravo-yellow hover:bg-bravo-gold text-bravo-navy font-black text-base px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bravo-yellow/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Voltar para o início
      </a>
    </div>
  `
})
export class NotFoundComponent {}
