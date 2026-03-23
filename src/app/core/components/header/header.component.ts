import { Component, signal, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Menu, X, Phone } from 'lucide-angular';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly X = X;
  readonly Phone = Phone;
  readonly menuOpen = signal(false);
  readonly scrolled  = signal(false);

  constructor() {
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 72);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
