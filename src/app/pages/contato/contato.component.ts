import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-angular';

@Component({
  selector: 'app-contato',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contato.component.html'
})
export class ContatoComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('Fale Conosco | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Entre em contato com a Bravo Equipamentos. Solicite orçamento gratuito para locação ou venda de containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:title', content: 'Fale Conosco | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Solicite orçamento gratuito para containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://bravoequipamentos.com/fale-conosco' });
  }

  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  contactInfo = {
    email: 'contato@bravoequipamentos.com',
    phone: '(81) 3333-3333',
    address: 'Recife / PE',
    hours: 'Segunda a Sexta: 8h às 18h',
    mapsUrl: 'https://maps.app.goo.gl/6B4oUBWYiBHz9Nsn7',
    instagramUrl: 'https://www.instagram.com/bravoequipamentospe/',
    facebookUrl: 'https://www.facebook.com/bravoequipamentospe'
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}
