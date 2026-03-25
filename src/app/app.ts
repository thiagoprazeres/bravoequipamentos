import { Component, signal, ChangeDetectionStrategy, afterNextRender, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly scrollPct = signal(0);
  readonly pageEnter = signal(false);
  readonly showFab   = signal(false);

  private readonly router = inject(Router);

  constructor() {
    afterNextRender(() => {
      // Initial page enter animation
      requestAnimationFrame(() => this.pageEnter.set(true));

      // Scroll progress bar
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        this.scrollPct.set(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
        this.showFab.set(window.scrollY > 300);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      // Route page-enter fade
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          this.pageEnter.set(false);
          requestAnimationFrame(() => this.pageEnter.set(true));
          window.scrollTo({ top: 0 });
        });
    });
  }
}
