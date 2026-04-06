import { Component, inject, ChangeDetectionStrategy, signal, afterNextRender } from '@angular/core';
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
    nome:     new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    empresa:  new FormControl('', { nonNullable: true }),
    email:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    telefone: new FormControl('', { nonNullable: true }),
    mensagem: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  get nomeCtrl()     { return this.form.controls.nome; }
  get empresaCtrl()  { return this.form.controls.empresa; }
  get emailCtrl()    { return this.form.controls.email; }
  get telefoneCtrl() { return this.form.controls.telefone; }
  get mensagemCtrl() { return this.form.controls.mensagem; }

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

    afterNextRender(async () => {
      const L = await import('leaflet');
      const map = L.map('coverage-map', { center: [-8.5, -38.0], zoom: 6, scrollWheelZoom: false, zoomControl: true });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
        subdomains: 'abcd', maxZoom: 20,
      }).addTo(map);
      const icon = L.divIcon({
        html: `<div style="width:18px;height:18px;background:#F5C518;border:3px solid #0B2246;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35);"></div>`,
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -12],
      });
      L.marker([-8.173, -35.020], { icon })
        .addTo(map)
        .bindPopup('<strong style="color:#0B2246">Bravo Equipamentos</strong><br><span style="font-size:12px">Jaboatão dos Guararapes, PE</span>')
        .openPopup();
      L.circle([-8.5, -38.0], { radius: 1_100_000, color: '#F5C518', weight: 2, opacity: 0.5, fillColor: '#F5C518', fillOpacity: 0.06 }).addTo(map);
    });

    this.title.setTitle('Fale Conosco | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Entre em contato com a Bravo Equipamentos. Solicite orçamento gratuito para locação ou venda de containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:title', content: 'Fale Conosco | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Solicite orçamento gratuito para containers em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://bravoequipamentos.com/fale-conosco' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bravoequipamentos.com/images/BR-stand-de-vendas.webp' });
  }

  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;

  readonly contactInfo = {
    email: 'contato@bravoequipamentos.com',
    phone: '(81) 3479-9009',
    phone2: '(81) 98643-0000',
    whatsappUrl: 'https://wa.me/5581986430000?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20containers.',
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
    fetch('/bat/enviarForm.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        nome:     v.nome,
        empresa:  v.empresa,
        email:    v.email,
        telefone: v.telefone,
        mensagem: v.mensagem,
      }).toString(),
    })
      .then(() => {
        this.status.set('success');
        this.form.reset();
      })
      .catch(() => this.status.set('error'));
  }
}
