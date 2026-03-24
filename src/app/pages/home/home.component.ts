import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CONTAINERS } from '../../core/data/containers.data';
import { CLIENTS } from '../../core/data/clients.data';
import { LogoAnimComponent } from '../../core/components/logo-anim/logo-anim.component';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../core/services/canonical.service';
import {
  LucideAngularModule,
  ShoppingCart, Home, Wrench, CheckCircle2, Users, Clock,
  Shield, Zap, Award, ArrowRight, Star, Phone, MapPin, Mail,
  HardHat, Truck, ClipboardCheck
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule, LogoAnimComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly title     = inject(Title);
  private readonly meta      = inject(Meta);
  private readonly canonical = inject(CanonicalService);
  constructor() {
    this.canonical.set('https://bravoequipamentos.com/');
    this.title.setTitle('Bravo Equipamentos | Locação e Venda de Containers em Recife');
    this.meta.updateTag({ name: 'description', content: 'Containers para locação e venda em Recife e PE. Escritórios, almoxarifados, sanitários e mais. Entrega em 24-48h. Solicite orçamento grátis!' });
    this.meta.updateTag({ property: 'og:title', content: 'Bravo Equipamentos | Containers em Recife' });
    this.meta.updateTag({ property: 'og:description', content: 'Containers para locação e venda em Recife e PE. Entrega rápida e preço justo.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://bravoequipamentos.com/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bravoequipamentos.com/images/BR-stand-de-vendas.webp' });

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

  readonly clientsRow1 = CLIENTS.slice(0, 44);
  readonly clientsRow2 = CLIENTS.slice(44);

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

  readonly containerTypes = CONTAINERS;

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
      text: 'Excelente prestação de locação, qualidade e atendimento rápido quando foi preciso. Parabéns!!!',
      author: 'Marina Buarque',
      period: '4 anos atrás',
      rating: 5,
      avatarUrl: null,
      avatarInitial: 'M'
    },
    {
      text: 'Lugar fácil localidade, bom fazer locação com ótimos preços.',
      author: 'Priscila Ms',
      period: '5 anos atrás',
      rating: 4,
      avatarUrl: null,
      avatarInitial: 'P'
    },
    {
      text: 'Boa.',
      author: 'José Marcos de Freitas',
      period: 'um ano atrás',
      rating: 4,
      avatarUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjUsyZEbNDEjmTsqPuP3HRFV4CxUjOkHY3dE6tZpy7CSlE1T-dF2AQ=w144-h144-p-rp-mo-ba3-br100',
      avatarInitial: null
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
