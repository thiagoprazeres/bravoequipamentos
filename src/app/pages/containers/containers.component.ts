import { Component, inject, ChangeDetectionStrategy, signal, viewChild, ElementRef, afterNextRender, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GsapService } from '../../core/services/gsap.service';
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

  private readonly platformId  = inject(PLATFORM_ID);
  private readonly gsap        = inject(GsapService);
  private readonly dialogRef   = viewChild<ElementRef<HTMLDialogElement>>('layoutDialog');
  private readonly magneticCta = viewChild<ElementRef>('magneticCta');
  private readonly catalogGrid = viewChild<ElementRef>('catalogGrid');

  readonly activeLayout = signal<{ name: string; url: string } | null>(null);

  openLayout(url: string, name: string): void {
    this.activeLayout.set({ name, url });
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => this.dialogRef()?.nativeElement.showModal());
    }
  }

  closeLayout(): void {
    this.dialogRef()?.nativeElement.close();
    this.activeLayout.set(null);
  }


  constructor() {
    afterNextRender(() => {
      const grid = this.catalogGrid()?.nativeElement as HTMLElement | undefined;
      if (grid) {
        const cards = Array.from(grid.querySelectorAll<HTMLElement>(':scope > *'));
        this.gsap.staggerReveal(cards, grid);
      }

      const cta = this.magneticCta()?.nativeElement as HTMLElement | undefined;
      if (cta) this.gsap.magneticHover(cta, 0.3);
    });

    this.title.setTitle('Containers para Locação e Venda | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Catálogo completo de containers: escritório, almoxarifado, sanitário, vestíário e mais. Locação e venda em Recife e região metropolitana.' });
    this.meta.updateTag({ property: 'og:title', content: 'Containers para Locação e Venda | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Catálogo completo de containers para locação e venda em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/containers' });

  }

  readonly Check = Check;
  readonly Zap = Zap;
  readonly Wrench = Wrench;

  containers = [
    {
      name: 'Almoxarifado',
      description: 'Espaço seguro e organizado para guardar materiais, ferramentas e insumos de obra. Interior revestido em madeira, prateleiras opcionais e porta dupla com tranca reforçada.',
      features: ['Porta dupla reforçada', 'Prateleiras opcionais', 'Interior em madeira', 'Ventilado'],
      image: 'https://bravoequipamentos.com/images/BR-almoxarifado.jpg',
      layout: 'https://bravoequipamentos.com/images/Almoxarifado.png'
    },
    {
      name: 'Banheiro Coletivo',
      description: 'Solução sanitária completa para canteiro de obras. Atende à NR 18 (item 18.4.1.3) com ventilação mínima de 15% da área do piso, pé-direito ≥ 2,40 m e condições adequadas de higiene.',
      features: ['Conforme NR 18', 'Múltiplos sanitários', 'Chuveiros', 'Lavatórios', 'Ventilação regulamentada'],
      image: 'https://bravoequipamentos.com/images/BR-banheiro-01.JPG',
      layout: 'https://bravoequipamentos.com/images/Banheiro-coletivo.png'
    },
    {
      name: 'Depósito',
      description: 'Container de grande capacidade para armazenamento de equipamentos pesados, materiais de construção e insumos. Estrutura metálica resistente com porta dupla e piso reforçado.',
      features: ['Grande capacidade', 'Porta dupla', 'Piso reforçado', 'Alta resistência'],
      image: 'https://bravoequipamentos.com/images/BR-deposito.jpg',
      layout: 'https://bravoequipamentos.com/images/Deposito-porta-dupla.png'
    },
    {
      name: 'Escritório c/ WC',
      description: 'Escritório completo com banheiro integrado para gestão de obras. Revestimento interno em PVC, iluminação fluorescente, janelas e ar-condicionado com manutenção preventiva em dia.',
      features: ['Banheiro integrado', 'Ar-condicionado', 'Revestimento em PVC', 'Iluminação inclusa'],
      image: 'https://bravoequipamentos.com/images/BR-escritorio_com_wc.jpg',
      layout: 'https://bravoequipamentos.com/images/Escritorio-com-banheiro.png'
    },
    {
      name: 'Escritório s/ WC',
      description: 'Ambiente de trabalho confortável e funcional para administração de projetos. Paredes em PVC, iluminação fluorescente, janelas amplas e ar-condicionado com manutenção em dia.',
      features: ['Ar-condicionado', 'Revestimento em PVC', 'Janelas amplas', 'Iluminação inclusa'],
      image: 'https://bravoequipamentos.com/images/BR-escritorio_sem_wc.jpg',
      layout: 'https://bravoequipamentos.com/images/Escritorio-sem-banheiro.png'
    },
    {
      name: 'Vestiário',
      description: 'Espaço adequado para troca de roupas e guarda de pertences dos trabalhadores. Armários individuais, bancos e boa ventilação natural conforme normas de canteiro de obra.',
      features: ['Armários individuais', 'Bancos', 'Ventilação natural', 'Conforme NR 18'],
      image: 'https://bravoequipamentos.com/images/page4_img6.jpg',
      layout: 'https://bravoequipamentos.com/images/Vestiario.png'
    },
    {
      name: 'Stand de Vendas',
      description: 'Container adaptado como ponto de atendimento ao cliente ou sala de vendas em obras. Acabamento interno clean, frente envidraçada para visibilidade e instalação elétrica completa.',
      features: ['Frente envidraçada', 'Acabamento clean', 'Instalação elétrica', 'Ar-condicionado'],
      image: '/images/stand-exterior-03.jpg',
      layout: '',
      route: '/stand-de-vendas'
    }
  ];
}
