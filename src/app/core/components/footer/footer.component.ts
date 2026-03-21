import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Instagram, Facebook, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;
  readonly MapPin = MapPin;
  currentYear = new Date().getFullYear();
}
