import { Component, signal, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X, Phone } from 'lucide-angular';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
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
      // Scroll-aware shrink
      const onScroll = () => this.scrolled.set(window.scrollY > 72);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Entrance: nav links stagger in
      gsap.from('.header-nav-item', {
        opacity: 0, y: -8, duration: 0.45, ease: 'power2.out', stagger: 0.07, delay: 0.2,
      });
    });
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
