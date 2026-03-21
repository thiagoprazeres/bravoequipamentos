import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Award, Users, Clock, CheckCircle2, Target, Eye } from 'lucide-angular';

@Component({
  selector: 'app-sobre',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './sobre.component.html'
})
export class SobreComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('Sobre Nós | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Há mais de 10 anos fornecendo containers de qualidade em Pernambuco. Conheça a história e os valores da Bravo Equipamentos.' });
    this.meta.updateTag({ property: 'og:title', content: 'Sobre Nós | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Há mais de 10 anos fornecendo containers de qualidade em Pernambuco.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/sobre-a-bravo' });
  }

  readonly Award = Award;
  readonly Users = Users;
  readonly Clock = Clock;
  readonly CheckCircle2 = CheckCircle2;
  readonly Target = Target;
  readonly Eye = Eye;
  features = [
    {
      title: 'Mais de 10 anos de experiência',
      description: 'Atuando no mercado desde 2011, oferecendo soluções em locação de containers e equipamentos para obras.'
    },
    {
      title: 'Profissionais Técnicos Especialistas',
      description: 'Equipe altamente qualificada e treinada para atender suas necessidades com excelência.'
    },
    {
      title: 'Pontualidade e Qualidade',
      description: 'Compromisso com prazos e qualidade superior em todos os nossos serviços e produtos.'
    }
  ];

  values = [
    'Comprometimento com o cliente',
    'Qualidade em primeiro lugar',
    'Inovação constante',
    'Respeito ao meio ambiente',
    'Ética e transparência'
  ];
}
