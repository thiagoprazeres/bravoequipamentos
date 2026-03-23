import { Component, inject, ChangeDetectionStrategy, signal, afterNextRender, viewChild, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Phone, CheckCircle2, Clock, Truck, Shield, ChevronDown, Zap, Star } from 'lucide-angular';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-stand-de-vendas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  templateUrl: './stand-de-vendas.component.html'
})
export class StandDeVendasComponent {
  private readonly title = inject(Title);
  private readonly meta  = inject(Meta);
  private readonly gsap  = inject(GsapService);

  private readonly magneticCta  = viewChild<ElementRef>('magneticCta');
  private readonly heroImg      = viewChild<ElementRef>('heroImg');
  private readonly galleryGrid  = viewChild<ElementRef>('galleryGrid');

  readonly Phone          = Phone;
  readonly CheckCircle2   = CheckCircle2;
  readonly Clock          = Clock;
  readonly Truck          = Truck;
  readonly Shield         = Shield;
  readonly ChevronDown    = ChevronDown;
  readonly Zap            = Zap;
  readonly Star           = Star;

  readonly whatsappUrl = 'https://wa.me/5581991118980?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Stand%20de%20Vendas%20em%20Container.%20Pode%20me%20passar%20um%20or%C3%A7amento%3F';

  openFaq = signal<number | null>(null);

  toggleFaq(i: number) {
    this.openFaq.update(cur => cur === i ? null : i);
  }

  constructor() {
    afterNextRender(() => {
      const cta = this.magneticCta()?.nativeElement as HTMLElement | undefined;
      if (cta) this.gsap.magneticHover(cta, 0.3);

      const img = this.heroImg()?.nativeElement as HTMLElement | undefined;
      if (img) this.gsap.parallax(img, 0.12);

      const gallery = this.galleryGrid()?.nativeElement as HTMLElement | undefined;
      if (gallery) {
        Promise.all([
          import('lightgallery'),
          import('lightgallery/plugins/zoom'),
        ]).then(([{ default: lightGallery }, { default: lgZoom }]) => {
          lightGallery(gallery, {
            plugins: [lgZoom],
            speed: 400,
            download: false,
            counter: false,
            mobileSettings: { controls: true, showCloseIcon: true },
          });
        });
      }
    });

    this.title.setTitle('Stand de Vendas em Container | Bravo Equipamentos — Recife PE');
    this.meta.updateTag({ name: 'description', content: 'Monte seu Stand de Vendas em um container moderno. Entrega rápida em Recife e região. Instalação elétrica, frente envidraçada e ar-condicionado. Solicite orçamento agora!' });
    this.meta.updateTag({ property: 'og:title',       content: 'Stand de Vendas em Container | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Stand de Vendas em container moderno, econômico e rápido. Entrega em Recife e PE.' });
    this.meta.updateTag({ property: 'og:url',         content: 'https://bravoequipamentos.com/stand-de-vendas' });
  }

  features = [
    { icon: 'zap',    label: 'Instalado em dias',       detail: 'Sem obra, sem demora. Pronto para usar em tempo recorde.' },
    { icon: 'shield', label: 'Estrutura robusta',        detail: 'Aço corten de alta resistência, sem goteiras e sem cupins.' },
    { icon: 'truck',  label: 'Entrega incluída',         detail: 'Logística própria em toda a Região Metropolitana do Recife.' },
    { icon: 'check',  label: 'Elétrica completa',        detail: 'Tomadas, iluminação LED e quadro elétrico — tudo instalado.' },
    { icon: 'check',  label: 'Frente envidraçada',       detail: 'Vitrine de impacto para atrair clientes com muito mais visibilidade.' },
    { icon: 'check',  label: 'Ar-condicionado opcional', detail: 'Ambientar o espaço fica simples com o suporte já preparado.' },
  ];

  faqs = [
    {
      q: 'Em quanto tempo o stand fica pronto?',
      a: 'Após a assinatura do contrato, a entrega é feita em até 48h para a Grande Recife. A instalação elétrica e acabamentos finais levam mais 1–2 dias, dependendo da complexidade da obra.'
    },
    {
      q: 'Posso personalizar a fachada com minha marca?',
      a: 'Sim! O container é pintado e pode receber adesivagem ou plotagem com a identidade visual do seu empreendimento. Consultamos sobre as opções de personalização no orçamento.'
    },
    {
      q: 'O stand funciona em terrenos sem calçamento?',
      a: 'Funciona. O container é apoiado em sapatas niveladas. Para terrenos muito irregulares, a nossa equipe técnica avalia a melhor solução de apoio sem necessidade de obra civil.'
    },
    {
      q: 'Qual o tamanho disponível?',
      a: 'Trabalhamos com módulos de 20 pés (~14 m²) e 40 pés (~28 m²). Também é possível combinar dois módulos para criar um stand maior, tudo dentro do mesmo prazo de entrega.'
    },
    {
      q: 'Locação ou compra — qual é melhor para um stand de obras?',
      a: 'Para canteiros com prazo definido, a locação é mais vantajosa: você paga apenas pelo período da obra e devolve sem custo de demolição. Para stands permanentes, a compra pode ser mais econômica a longo prazo.'
    },
  ];

  gallery = [
    { src: '/images/stand-exterior-01.jpg', alt: 'Stand de vendas com frente de vidro em obra' },
    { src: '/images/stand-exterior-02.jpg', alt: 'Stand de vendas amarelo com vitrine em canteiro' },
    { src: '/images/stand-exterior-03.jpg', alt: 'Stand de vendas em operação com fachada personalizada' },
  ];
}
