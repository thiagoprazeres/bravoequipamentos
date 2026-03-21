import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Quote } from 'lucide-angular';

interface Client {
  logo: string;
  category: string;
}

const BASE = 'https://bravoequipamentos.com/images/LOGOMARCAS';

@Component({
  selector: 'app-clientes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('Nossos Clientes | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: '+87 empresas de construção, indústria, governo e saúde confiam na Bravo Equipamentos em Pernambuco.' });
    this.meta.updateTag({ property: 'og:title', content: 'Nossos Clientes | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: '+87 empresas confiam na Bravo Equipamentos em Pernambuco.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/clientes' });
  }

  readonly Quote = Quote;

  readonly categories = ['Todos', 'Construção', 'Indústria', 'Governo', 'Saúde', 'Serviço', 'Outros'];

  readonly activeFilter = signal('Todos');

  readonly allClients: Client[] = [
    // Construção (21)
    { category: 'Construção', logo: `${BASE}/construcao/01.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/2.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/3.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/4.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/5.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/6.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/7.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/8.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/9.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/10.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/11.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/12.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/13.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/14.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/15.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/16.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/17.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/18.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/19.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/20.jpg` },
    { category: 'Construção', logo: `${BASE}/construcao/21.jpg` },
    // Indústria (21)
    { category: 'Indústria', logo: `${BASE}/industria/22.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/23.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/24.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/25.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/26.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/27.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/28.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/29.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/30.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/31.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/32.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/33.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/34.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/35.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/36.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/37.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/38.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/39.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/40.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/41.jpg` },
    { category: 'Indústria', logo: `${BASE}/industria/42.jpg` },
    // Governo (3)
    { category: 'Governo', logo: `${BASE}/governo/43.jpg` },
    { category: 'Governo', logo: `${BASE}/governo/44.jpg` },
    { category: 'Governo', logo: `${BASE}/governo/45.jpg` },
    // Saúde (4)
    { category: 'Saúde', logo: `${BASE}/saude/46.jpg` },
    { category: 'Saúde', logo: `${BASE}/saude/47.jpg` },
    { category: 'Saúde', logo: `${BASE}/saude/48.jpg` },
    { category: 'Saúde', logo: `${BASE}/saude/49.jpg` },
    // Serviço (24)
    { category: 'Serviço', logo: `${BASE}/servico/50.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/51.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/52.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/53.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/54.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/55.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/56.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/57.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/58.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/59.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/60.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/61.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/62.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/63.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/64.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/65.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/66.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/67.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/68.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/69.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/70.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/71.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/72.jpg` },
    { category: 'Serviço', logo: `${BASE}/servico/73.jpg` },
    // Outros (14)
    { category: 'Outros', logo: `${BASE}/outros/74.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/75.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/76.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/77.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/78.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/79.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/80.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/81.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/82.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/83.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/84.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/85.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/86.jpg` },
    { category: 'Outros', logo: `${BASE}/outros/87.jpg` },
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
