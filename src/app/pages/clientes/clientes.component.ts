import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../core/services/canonical.service';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';

interface Client {
  logo: string;
  category: string;
}

const BASE = '/images/LOGOMARCAS';

@Component({
  selector: 'app-clientes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  private readonly title     = inject(Title);
  private readonly meta      = inject(Meta);
  private readonly canonical = inject(CanonicalService);

  constructor() {
    this.canonical.set('https://bravoequipamentos.com/clientes');
    this.title.setTitle('Nossos Clientes | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: '+87 empresas de construção, indústria, governo e saúde confiam na Bravo Equipamentos em Pernambuco.' });
    this.meta.updateTag({ property: 'og:title', content: 'Nossos Clientes | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: '+87 empresas confiam na Bravo Equipamentos em Pernambuco.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://bravoequipamentos.com/clientes' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bravoequipamentos.com/images/BR-stand-de-vendas.webp' });
  }

  readonly Quote = Quote;
  readonly Star = Star;

  readonly categories = ['Todos', 'Construção', 'Indústria', 'Governo', 'Saúde', 'Serviço', 'Outros'];

  readonly activeFilter = signal('Todos');

  readonly allClients: Client[] = [
    // Construção (21)
    { category: 'Construção', logo: `${BASE}/construcao/01.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/2.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/3.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/4.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/5.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/6.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/7.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/8.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/9.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/10.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/11.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/12.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/13.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/14.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/15.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/16.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/17.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/18.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/19.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/20.webp` },
    { category: 'Construção', logo: `${BASE}/construcao/21.webp` },
    // Indústria (21)
    { category: 'Indústria', logo: `${BASE}/industria/22.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/23.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/24.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/25.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/26.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/27.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/28.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/29.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/30.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/31.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/32.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/33.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/34.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/35.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/36.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/37.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/38.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/39.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/40.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/41.webp` },
    { category: 'Indústria', logo: `${BASE}/industria/42.webp` },
    // Governo (3)
    { category: 'Governo', logo: `${BASE}/governo/43.webp` },
    { category: 'Governo', logo: `${BASE}/governo/44.webp` },
    { category: 'Governo', logo: `${BASE}/governo/45.webp` },
    // Saúde (4)
    { category: 'Saúde', logo: `${BASE}/saude/46.webp` },
    { category: 'Saúde', logo: `${BASE}/saude/47.webp` },
    { category: 'Saúde', logo: `${BASE}/saude/48.webp` },
    { category: 'Saúde', logo: `${BASE}/saude/49.webp` },
    // Serviço (24)
    { category: 'Serviço', logo: `${BASE}/servico/50.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/51.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/52.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/53.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/54.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/55.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/56.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/57.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/58.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/59.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/60.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/61.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/62.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/63.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/64.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/65.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/66.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/67.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/68.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/69.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/70.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/71.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/72.webp` },
    { category: 'Serviço', logo: `${BASE}/servico/73.webp` },
    // Outros (14)
    { category: 'Outros', logo: `${BASE}/outros/74.webp` },
    { category: 'Outros', logo: `${BASE}/outros/75.webp` },
    { category: 'Outros', logo: `${BASE}/outros/76.webp` },
    { category: 'Outros', logo: `${BASE}/outros/77.webp` },
    { category: 'Outros', logo: `${BASE}/outros/78.webp` },
    { category: 'Outros', logo: `${BASE}/outros/79.webp` },
    { category: 'Outros', logo: `${BASE}/outros/80.webp` },
    { category: 'Outros', logo: `${BASE}/outros/81.webp` },
    { category: 'Outros', logo: `${BASE}/outros/82.webp` },
    { category: 'Outros', logo: `${BASE}/outros/83.webp` },
    { category: 'Outros', logo: `${BASE}/outros/84.webp` },
    { category: 'Outros', logo: `${BASE}/outros/85.webp` },
    { category: 'Outros', logo: `${BASE}/outros/86.webp` },
    { category: 'Outros', logo: `${BASE}/outros/87.webp` },
  ];

  readonly filteredClients = computed(() => {
    const f = this.activeFilter();
    return f === 'Todos' ? this.allClients : this.allClients.filter(c => c.category === f);
  });

  readonly filteredCount = computed(() => this.filteredClients().length);

  setFilter(category: string) {
    this.activeFilter.set(category);
  }

  testimonials = [
    {
      text: 'Agilidade e profissionalismo impecáveis. O container chegou no dia prometido e em perfeito estado. Recomendo sem hesitar.',
      author: 'Carlos Menezes',
      role: 'Gerente de Obras — Construtora Horizonte'
    },
    {
      text: 'A Bravo nos atendeu em menos de 24h. Preço justo, contrato claro e suporte excelente durante toda a obra. Empresa séria.',
      author: 'Ana Paula Ferreira',
      role: 'Diretora de Projetos — EngePlan Recife'
    },
    {
      text: 'Já é a terceira obra que uso a Bravo. Qualidade constante, equipe atenciosa e entrega sempre no prazo. Parceria consolidada.',
      author: 'Roberto Alves',
      role: 'Engenheiro Civil — Multisul Engenharia'
    }
  ];
}
