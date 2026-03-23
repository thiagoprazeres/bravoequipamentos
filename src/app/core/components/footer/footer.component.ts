import { Component, ChangeDetectionStrategy, signal, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Instagram, Facebook, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;
  readonly MapPin = MapPin;
  readonly currentYear = signal(2025);

  constructor() {
    afterNextRender(() => this.currentYear.set(new Date().getFullYear()));
  }
}
