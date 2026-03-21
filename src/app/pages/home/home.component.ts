import { Component, inject, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild } from '@angular/core';
import { LogoAnimComponent } from '../../core/components/logo-anim/logo-anim.component';
import { GsapService } from '../../core/services/gsap.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import {
  LucideAngularModule,
  ShoppingCart, Home, Wrench, CheckCircle2, Users, Clock,
  Shield, Zap, Award, ArrowRight, Star, Phone, MapPin, Mail,
  HardHat, Truck, ClipboardCheck
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule, LogoAnimComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly title   = inject(Title);
  private readonly meta    = inject(Meta);
  private readonly gsap    = inject(GsapService);

  private readonly heroPhoto        = viewChild<ElementRef>('heroPhoto');
  private readonly magneticCta      = viewChild<ElementRef>('magneticCta');
  private readonly statsGrid        = viewChild<ElementRef>('statsGrid');
  private readonly servicesGrid     = viewChild<ElementRef>('servicesGrid');
  private readonly catalogGrid      = viewChild<ElementRef>('catalogGrid');
  private readonly testimonialsGrid = viewChild<ElementRef>('testimonialsGrid');

  constructor() {
    this.title.setTitle('Bravo Equipamentos | Locação e Venda de Containers em Recife');
    this.meta.updateTag({ name: 'description', content: 'Containers para locação e venda em Recife e PE. Escritórios, almoxarifados, sanitários e mais. Entrega em 24-48h. Solicite orçamento grátis!' });
    this.meta.updateTag({ property: 'og:title', content: 'Bravo Equipamentos | Containers em Recife' });
    this.meta.updateTag({ property: 'og:description', content: 'Containers para locação e venda em Recife e PE. Entrega rápida e preço justo.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/' });

    afterNextRender(() => this.#initMotion());
  }

  #initMotion(): void {
    // ── Hero photo parallax ──────────────────────────────────────────────
    const photoWrap = this.heroPhoto()?.nativeElement as HTMLElement | undefined;
    if (photoWrap) this.gsap.parallax(photoWrap, 0.18);

    // ── Primary CTA magnetic hover ───────────────────────────────────────
    const ctaEl = this.magneticCta()?.nativeElement as HTMLElement | undefined;
    if (ctaEl) this.gsap.magneticHover(ctaEl, 0.3);

    // ── Stats count-up ───────────────────────────────────────────────────
    const statsEl = this.statsGrid()?.nativeElement as HTMLElement | undefined;
    if (statsEl) {
      statsEl.querySelectorAll<HTMLElement>('.stat-counter').forEach(el => {
        const end    = Number(el.dataset['countEnd']    ?? 0);
        const suffix = String(el.dataset['countSuffix'] ?? '');
        this.gsap.countUp(el, end, { suffix });
      });
    }

    // ── GSAP stagger grids (replaces CSS scroll-in on individual cards) ──
    const staggerGrid = (refEl: HTMLElement | undefined) => {
      if (!refEl) return;
      const cards = Array.from(refEl.querySelectorAll<HTMLElement>(':scope > *'));
      this.gsap.staggerReveal(cards, refEl);
    };
    staggerGrid(this.servicesGrid()?.nativeElement);
    staggerGrid(this.catalogGrid()?.nativeElement);
    staggerGrid(this.testimonialsGrid()?.nativeElement);
  }

  readonly ShoppingCart = ShoppingCart;
  readonly Home = Home;
  readonly Wrench = Wrench;
  readonly CheckCircle2 = CheckCircle2;
  readonly Users = Users;
  readonly Clock = Clock;
  readonly Shield = Shield;
  readonly Zap = Zap;
  readonly Award = Award;
  readonly ArrowRight = ArrowRight;
  readonly Star = Star;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Mail = Mail;
  readonly HardHat = HardHat;
  readonly Truck = Truck;
  readonly ClipboardCheck = ClipboardCheck;

  stats = [
    { value: '10+',  label: 'Anos de Experiência', countEnd: 10,  countSuffix: '+' },
    { value: '500+', label: 'Projetos Entregues',   countEnd: 500, countSuffix: '+' },
    { value: '100%', label: 'Taxa de Satisfação',   countEnd: 100, countSuffix: '%' },
    { value: '24h',  label: 'Tempo de Resposta',    countEnd: 24,  countSuffix: 'h' },
  ];

  services = [
    {
      title: 'Locação de Containers',
      description: 'Alugue containers por tempo flexível — dias, meses ou obra toda. Contrato simples, entrega rápida e suporte incluído.',
      icon: 'rent',
      badge: 'Mais Popular'
    },
    {
      title: 'Venda de Containers',
      description: 'Adquira um container de alta qualidade com garantia. Estoque variado, condições facilitadas e assistência técnica.',
      icon: 'sell',
      badge: null
    },
    {
      title: 'Projetos Especiais',
      description: 'Transformamos containers em escritórios, vestiários, banheiros e soluções personalizadas para a sua obra.',
      icon: 'project',
      badge: 'Sob Medida'
    }
  ];

  differentials = [
    {
      icon: 'award',
      title: 'Qualidade Certificada',
      description: 'Todos os containers passam por rigorosa inspeção técnica antes da entrega. Sem surpresas na obra.'
    },
    {
      icon: 'zap',
      title: 'Entrega em 24-48h',
      description: 'Logística própria em Recife e região metropolitana. Você agenda, a gente entrega no prazo.'
    },
    {
      icon: 'shield',
      title: 'Contrato Transparente',
      description: 'Sem letras miúdas. Preço justo, condições claras e suporte dedicado durante toda a locação.'
    },
    {
      icon: 'users',
      title: 'Equipe Especializada',
      description: 'Profissionais técnicos com mais de 10 anos de experiência prontos para orientar seu projeto.'
    }
  ];

  containerTypes = [
    { name: 'Almoxarifado',      image: 'https://bravoequipamentos.com/images/BR-almoxarifado.jpg' },
    { name: 'Banheiro Coletivo', image: 'https://bravoequipamentos.com/images/BR-banheiro-01.JPG' },
    { name: 'Depósito',          image: 'https://bravoequipamentos.com/images/BR-deposito.jpg' },
    { name: 'Escritório c/ wc',  image: 'https://bravoequipamentos.com/images/BR-escritorio_com_wc.jpg' },
    { name: 'Escritório s/ wc',  image: 'https://bravoequipamentos.com/images/BR-escritorio_sem_wc.jpg' },
    { name: 'Vestiário',         image: 'https://bravoequipamentos.com/images/page4_img6.jpg' }
  ];

  steps = [
    {
      number: '01',
      title: 'Solicite o Orçamento',
      description: 'Preencha o formulário ou ligue. Resposta em até 24 horas úteis com proposta detalhada.'
    },
    {
      number: '02',
      title: 'Escolha e Assine',
      description: 'Selecione o container ideal para sua necessidade. Contrato digital, rápido e sem burocracia.'
    },
    {
      number: '03',
      title: 'Entrega na Obra',
      description: 'Nosso time entrega e instala o container direto no local indicado. Pronto para usar.'
    }
  ];

  testimonials = [
    {
      text: 'Agilidade e profissionalismo impecáveis. O container chegou no dia prometido e em perfeito estado. Recomendo sem hesitar.',
      author: 'Carlos Menezes',
      role: 'Gerente de Obras — Construtora Horizonte',
      rating: 5
    },
    {
      text: 'A Bravo nos atendeu em menos de 24h. Preço justo, contrato claro e suporte excelente durante toda a obra. Empresa séria.',
      author: 'Ana Paula Ferreira',
      role: 'Diretora de Projetos — EngePlan Recife',
      rating: 5
    },
    {
      text: 'Já é a terceira obra que uso a Bravo. Qualidade constante, equipe atenciosa e entrega sempre no prazo. Parceria consolidada.',
      author: 'Roberto Alves',
      role: 'Engenheiro Civil — Multisul Engenharia',
      rating: 5
    }
  ];

  faqs = [
    {
      question: 'Qual o prazo mínimo de locação?',
      answer: 'Trabalhamos com locações a partir de 30 dias, com renovação flexível conforme o andamento da sua obra.',
      open: false
    },
    {
      question: 'Vocês entregam fora de Recife?',
      answer: 'Sim! Atendemos toda a Região Metropolitana do Recife e cidades do interior de Pernambuco mediante consulta de disponibilidade.',
      open: false
    },
    {
      question: 'O transporte e instalação estão incluídos?',
      answer: 'O frete de entrega é cobrado conforme a distância. A instalação básica está inclusa. Adaptações específicas podem ter custo adicional.',
      open: false
    },
    {
      question: 'Como funciona a manutenção durante a locação?',
      answer: 'Nossa equipe técnica está disponível para suporte durante toda a locação. Qualquer problema é resolvido com prioridade.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
