import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../core/services/canonical.service';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';
import { CLIENTS } from '../../core/data/clients.data';

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

  readonly allClients = CLIENTS;

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
