import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Check, Zap, Wrench } from 'lucide-angular';

@Component({
  selector: 'app-containers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './containers.component.html'
})
export class ContainersComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('Containers para Locação e Venda | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Catálogo completo de containers: escritório, almoxarifado, sanitário, vestíário e mais. Locação e venda em Recife e região metropolitana.' });
    this.meta.updateTag({ property: 'og:title', content: 'Containers para Locação e Venda | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Catálogo completo de containers para locação e venda em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/containers' });
  }

  readonly Check = Check;
  readonly Zap = Zap;
  readonly Wrench = Wrench;

  readonly activeLayout = signal<{ name: string; url: string } | null>(null);

  openLayout(name: string, url: string) { this.activeLayout.set({ name, url }); }
  closeLayout() { this.activeLayout.set(null); }

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
