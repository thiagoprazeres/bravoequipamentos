# Bravo Equipamentos — Site Institucional

Site institucional da **Bravo Equipamentos**, empresa de locação e venda de containers habitáveis em Recife e Pernambuco.

🌐 [bravoequipamentos.com](https://bravoequipamentos.com)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Angular 21 (standalone, SSR) |
| Linguagem | TypeScript 5.9 |
| Estilização | Tailwind CSS v4 |
| Ícones | lucide-angular |
| Formulários | Reactive Forms (`@angular/forms`) |
| Máscara de input | Maskito |
| Galeria de fotos | lightgallery |
| Animação de logo | GSAP 3 *(lazy — carregado apenas na home)* |
| Fonte | Inter Variable (`@fontsource-variable/inter`) |
| Deploy | Netlify (com SSR + formulários nativos) |

---

## Páginas

| Rota | Componente | Descrição |
|---|---|---|
| `/` | `HomeComponent` | Landing page principal |
| `/containers` | `ContainersComponent` | Catálogo de containers com modal de plantas |
| `/stand-de-vendas` | `StandDeVendasComponent` | Página de produto — Stand de Vendas em Container |
| `/sobre-a-bravo` | `SobreComponent` | História, diferenciais e valores |
| `/clientes` | `ClientesComponent` | Clientes e depoimentos |
| `/fale-conosco` | `ContatoComponent` | Formulário de orçamento + mapa |
| `/**` | `NotFoundComponent` | Página 404 personalizada |

---

## Qualidade

| Categoria | Score (Lighthouse) |
|---|---|
| Acessibilidade | **100** |
| SEO | **100** |
| Boas Práticas | **100** |
| Performance | **pendente** — ver nota abaixo |

> **Performance local vs. produção:** o Lighthouse medido em `localhost` captura o LCP em ~5 s porque a hero image é servida de `bravoequipamentos.com` (cross-origin). Em produção, com as imagens auto-hospedadas no mesmo domínio e em formato WebP/AVIF com dimensões explícitas, o LCP cai para ~1–1,5 s e o score sobe substancialmente. A medição definitiva deve ser feita pós-deploy com o Lighthouse do Chrome DevTools ou [PageSpeed Insights](https://pagespeed.web.dev).

### SEO & Metadados
- Canonical URL por página via `CanonicalService`
- JSON-LD `LocalBusiness` + `FAQPage`
- Open Graph + Twitter Card por página
- `robots.txt` com referência ao `sitemap.xml`
- Apple Touch Icon + Web App Manifest (PWA)

### Acessibilidade (WCAG AA)
- Skip navigation link
- `aria-expanded` em todos os acordeões FAQ
- `aria-modal` + `aria-labelledby` no `<dialog>` de plantas
- `prefers-reduced-motion` — desativa animações/transições via CSS
- Contraste de cores validado

### Bundle (produção)

| Chunk | Tamanho raw | Gzip |
|---|---|---|
| `main.js` (inicial, todas as rotas) | 17.5 kB | 4.8 kB |
| `home-component` *(lazy — inclui GSAP)* | 101 kB | 33 kB |
| `contato-component` *(lazy)* | 59 kB | 15 kB |
| `stand-de-vendas-component` *(lazy)* | 20 kB | 6 kB |
| `containers-component` *(lazy)* | 17 kB | 5 kB |

---

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (SSR)
ng serve

# Build de produção
ng build
```

O servidor de desenvolvimento estará disponível em `http://localhost:4200/`.

---

## Estrutura relevante

```
src/
├── app/
│   ├── core/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── data/
│   │   │   └── containers.data.ts     # Fonte única dos 8 produtos (CONTAINERS[])
│   │   ├── models/
│   │   │   └── container.model.ts     # Interface Container (slug, name, photos…)
│   │   └── services/
│   │       └── canonical.service.ts   # Gerencia <link rel="canonical">
│   ├── pages/
│   │   ├── home/
│   │   ├── containers/
│   │   ├── stand-de-vendas/
│   │   ├── sobre/
│   │   ├── clientes/
│   │   ├── contato/
│   │   └── not-found/
│   ├── app.routes.ts                  # Lazy loading por rota
│   └── app.ts                         # App root + scroll progress
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── logos/
└── styles.css                         # Estilos globais + animações
```

---

## Padrões de código

- Componentes standalone (sem `NgModule`)
- Estado local com `signal()` e `computed()`
- `ChangeDetectionStrategy.OnPush` em todos os componentes
- `inject()` para injeção de dependências
- Controle de fluxo nativo (`@for`, `@if`, `@switch`) — sem `*ngFor`/`*ngIf`
- Sem `CommonModule` em nenhum componente
- Formulários com **Reactive Forms** (`FormGroup`, `FormControl`, `Validators`)
- Entidade `Container` modelada em `core/models/` com fonte única de dados em `core/data/`
- Catálogo com 8 produtos identificados por `slug` — badges, fotos e plantas configuráveis por dado
