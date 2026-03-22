import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Bravo Equipamentos | Containers em Recife e Nordeste',
    data: {
      description: 'Locação e venda de containers em Recife e Pernambuco. Escritórios, almoxarifados, banheiros, vestiários e stands de vendas. Atendemos toda a Região Metropolitana e o Nordeste. Orçamento grátis!',
      ogUrl: 'https://bravoequipamentos.com/'
    },
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'sobre-a-bravo',
    title: 'Sobre a Bravo | Containers em Recife desde 2010',
    data: {
      description: 'Conheça a Bravo Equipamentos: mais de uma década locando e vendendo containers em Recife e Pernambuco. Qualidade, agilidade e suporte completo para sua obra.',
      ogUrl: 'https://bravoequipamentos.com/sobre-a-bravo'
    },
    loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'containers',
    title: 'Tipos de Container | Bravo Equipamentos — Recife PE',
    data: {
      description: 'Conheça nossos modelos: almoxarifado, escritório com e sem WC, banheiro coletivo, vestiário e stand de vendas. Containers para locação e venda em Recife e região.',
      ogUrl: 'https://bravoequipamentos.com/containers'
    },
    loadComponent: () => import('./pages/containers/containers.component').then(m => m.ContainersComponent)
  },
  {
    path: 'clientes',
    title: 'Clientes | Bravo Equipamentos — Cases de Sucesso',
    data: {
      description: 'Construtoras, incorporadoras e empresas de todo o Nordeste confiam na Bravo Equipamentos para locação de containers. Veja nossos cases de sucesso.',
      ogUrl: 'https://bravoequipamentos.com/clientes'
    },
    loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent)
  },
  {
    path: 'fale-conosco',
    title: 'Fale Conosco | Bravo Equipamentos — Orçamento Grátis',
    data: {
      description: 'Entre em contato com a Bravo Equipamentos. Solicite orçamento gratuito para locação ou venda de containers em Recife, PE. Respondemos em até 24 horas.',
      ogUrl: 'https://bravoequipamentos.com/fale-conosco'
    },
    loadComponent: () => import('./pages/contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: 'stand-de-vendas',
    title: 'Stand de Vendas em Container | Bravo Equipamentos — Recife PE',
    data: {
      description: 'Monte seu Stand de Vendas em container moderno para lançamentos imobiliários. Frente envidraçada, ar-condicionado e elétrica completa. Entrega rápida em Recife e região.',
      ogUrl: 'https://bravoequipamentos.com/stand-de-vendas'
    },
    loadComponent: () => import('./pages/stand-de-vendas/stand-de-vendas.component').then(m => m.StandDeVendasComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
