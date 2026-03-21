import { Component, inject, ChangeDetectionStrategy, signal, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Check, Zap, Wrench } from 'lucide-angular';
import gsap from 'gsap';

@Component({
  selector: 'app-containers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './containers.component.html'
})
export class ContainersComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly modalOverlay = viewChild<ElementRef>('modalOverlay');
  private readonly modalPanel   = viewChild<ElementRef>('modalPanel');

  constructor() {
    this.title.setTitle('Containers para Locação e Venda | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Catálogo completo de containers: escritório, almoxarifado, sanitário, vestíário e mais. Locação e venda em Recife e região metropolitana.' });
    this.meta.updateTag({ property: 'og:title', content: 'Containers para Locação e Venda | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Catálogo completo de containers para locação e venda em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/containers' });

    effect(() => {
      if (this.activeLayout()) {
        queueMicrotask(() => this.#animateIn());
      }
    });
  }

  #animateIn(): void {
    const overlay = this.modalOverlay()?.nativeElement as HTMLElement | undefined;
    const panel   = this.modalPanel()?.nativeElement   as HTMLElement | undefined;
    if (!overlay || !panel) return;

    const page = document.querySelector<HTMLElement>('main.main-content');
    if (page) gsap.to(page, { filter: 'blur(8px)', scale: 1.015, duration: 0.45, ease: 'power2.out' });

    gsap.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
    gsap.fromTo(panel,
      { opacity: 0, scale: 0.86, y: 36, filter: 'blur(6px)' },
      { opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)', duration: 0.5, ease: 'expo.out' }
    );
  }

  readonly Check = Check;
  readonly Zap = Zap;
  readonly Wrench = Wrench;

  readonly activeLayout = signal<{ name: string; url: string } | null>(null);

  openLayout(name: string, url: string) { this.activeLayout.set({ name, url }); }

  closeLayout(): void {
    const overlay = this.modalOverlay()?.nativeElement as HTMLElement | undefined;
    const panel   = this.modalPanel()?.nativeElement   as HTMLElement | undefined;

    if (!overlay || !panel) { this.activeLayout.set(null); return; }

    const page = document.querySelector<HTMLElement>('main.main-content');

    gsap.to(panel,   { opacity: 0, scale: 0.9, y: 20, filter: 'blur(4px)', duration: 0.28, ease: 'power2.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.32, ease: 'power2.in',
      onComplete: () => {
        if (page) gsap.to(page, { filter: 'blur(0px)', scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'filter,scale' });
        this.activeLayout.set(null);
      }
    });
  }

  containers = [
    {
      name: 'Almoxarifado',
      description: 'Container ideal para armazenamento de materiais e ferramentas de obra.',
      features: ['Seguro', 'Espaçoso', 'Ventilado'],
      image: 'https://bravoequipamentos.com/images/BR-almoxarifado.jpg',
      layout: 'https://bravoequipamentos.com/images/Almoxarifado.png'
    },
    {
      name: 'Banheiro Coletivo',
      description: 'Solução completa para higiene em obras com múltiplos sanitários.',
      features: ['Sanitários', 'Chuveiros', 'Lavatórios'],
      image: 'https://bravoequipamentos.com/images/BR-banheiro-01.JPG',
      layout: 'https://bravoequipamentos.com/images/Banheiro-coletivo.png'
    },
    {
      name: 'Depósito',
      description: 'Espaço amplo para armazenamento seguro de equipamentos e materiais.',
      features: ['Grande capacidade', 'Seguro', 'Resistente'],
      image: 'https://bravoequipamentos.com/images/BR-deposito.jpg',
      layout: 'https://bravoequipamentos.com/images/Deposito-porta-dupla.png'
    },
    {
      name: 'Escritório c/ wc',
      description: 'Escritório completo com banheiro integrado para gestão de obras.',
      features: ['Mesa e cadeiras', 'Ar condicionado', 'Banheiro'],
      image: 'https://bravoequipamentos.com/images/BR-escritorio_com_wc.jpg',
      layout: 'https://bravoequipamentos.com/images/Escritorio-com-banheiro.png'
    },
    {
      name: 'Escritório s/ wc',
      description: 'Ambiente de trabalho confortável para administração de projetos.',
      features: ['Mesa e cadeiras', 'Ar condicionado', 'Iluminação'],
      image: 'https://bravoequipamentos.com/images/BR-escritorio_sem_wc.jpg',
      layout: 'https://bravoequipamentos.com/images/Escritorio-sem-banheiro.png'
    },
    {
      name: 'Vestiário',
      description: 'Espaço adequado para troca de roupas e guarda de pertences.',
      features: ['Armários', 'Bancos', 'Ventilação'],
      image: 'https://bravoequipamentos.com/images/page4_img6.jpg',
      layout: 'https://bravoequipamentos.com/images/Vestiario.png'
    }
  ];
}
