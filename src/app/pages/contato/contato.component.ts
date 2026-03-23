import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../core/services/canonical.service';
import { LucideAngularModule, Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-angular';
import { MaskitoDirective } from '@maskito/angular';
import type { MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-contato',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, LucideAngularModule, MaskitoDirective],
  templateUrl: './contato.component.html'
})
export class ContatoComponent {
  private readonly title     = inject(Title);
  private readonly meta      = inject(Meta);
  private readonly canonical = inject(CanonicalService);

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  readonly form = new FormGroup({
    name:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email:   new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone:   new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  get nameCtrl()    { return this.form.controls.name; }
  get emailCtrl()   { return this.form.controls.email; }
  get messageCtrl() { return this.form.controls.message; }

  readonly phoneMask: MaskitoOptions = {
    mask: ({ value }) => {
      const digits = value.replace(/\D/g, '');
      return digits.length <= 10
        ? ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        : ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    },
  };

  constructor() {
    this.canonical.set('https://bravoequipamentos.com/fale-conosco');
    this.title.setTitle('Fale Conosco | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Entre em contato com a Bravo Equipamentos. Solicite orçamento gratuito para locação ou venda de containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:title', content: 'Fale Conosco | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Solicite orçamento gratuito para containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://bravoequipamentos.com/fale-conosco' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bravoequipamentos.com/images/BR-stand-de-vendas.jpg' });
  }

  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;

  readonly contactInfo = {
    email: 'contato@bravoequipamentos.com',
    phone: '(81) 9 9111-8980',
    whatsappUrl: 'https://wa.me/5581991118980?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20containers.',
    address: 'R. Mata Grande, 151 — Prazeres, Jaboatão dos Guararapes / PE',
    hours: 'Segunda a Sexta: 8h às 18h',
    mapsUrl: 'https://maps.app.goo.gl/6B4oUBWYiBHz9Nsn7',
    instagramUrl: 'https://www.instagram.com/bravoequipamentospe/',
    facebookUrl: 'https://www.facebook.com/bravoequipamentospe'
  };

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('loading');
    const v = this.form.getRawValue();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contato',
        name:    v.name,
        email:   v.email,
        phone:   v.phone,
        message: v.message,
      }).toString(),
    })
      .then(() => {
        this.status.set('success');
        this.form.reset();
      })
      .catch(() => this.status.set('error'));
  }
}
