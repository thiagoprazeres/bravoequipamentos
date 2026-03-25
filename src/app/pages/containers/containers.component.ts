import { Component, inject, ChangeDetectionStrategy, signal, viewChild, ElementRef, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CanonicalService } from '../../core/services/canonical.service';
import { LucideAngularModule, Check, Zap, Wrench } from 'lucide-angular';
import { Container } from '../../core/models/container.model';
import { CONTAINERS } from '../../core/data/containers.data';
import { BeforeAfterSliderComponent } from '../../core/components/before-after-slider/before-after-slider.component';

@Component({
  selector: 'app-containers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule, BeforeAfterSliderComponent],
  templateUrl: './containers.component.html'
})
export class ContainersComponent {
  private readonly title      = inject(Title);
  private readonly meta       = inject(Meta);
  private readonly canonical  = inject(CanonicalService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('layoutDialog');
  private readonly lgEl      = viewChild<ElementRef<HTMLElement>>('lgRoot');

  private lgInstance: { openGallery: (index: number) => void; destroy: () => void } | null = null;

  readonly activeLayout = signal<{ name: string; url: string } | null>(null);

  openLayout(url: string, name: string): void {
    this.activeLayout.set({ name, url });
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => this.dialogRef()?.nativeElement.showModal());
    }
  }

  closeLayout(): void {
    this.dialogRef()?.nativeElement.close();
    this.activeLayout.set(null);
  }

  openPhotos(container: Container): void {
    if (!isPlatformBrowser(this.platformId) || !container.photos.length) return;
    Promise.all([
      import('lightgallery'),
      import('lightgallery/plugins/zoom'),
    ]).then(([{ default: lightGallery }, { default: lgZoom }]) => {
      this.lgInstance?.destroy();
      this.lgInstance = null;
      const el = this.lgEl()?.nativeElement;
      if (!el) return;
      this.lgInstance = lightGallery(el, {
        plugins: [lgZoom],
        dynamic: true,
        dynamicEl: container.photos.map(src => ({ src })),
        speed: 400,
        download: false,
        closable: true,
      });
      this.lgInstance.openGallery(0);
    });
  }

  constructor() {
    this.canonical.set('https://bravoequipamentos.com/containers');
    this.title.setTitle('Containers para Locação e Venda | Bravo Equipamentos');
    this.meta.updateTag({ name: 'description', content: 'Catálogo completo de containers: escritório, almoxarifado, sanitário, vestíário e mais. Locação e venda em Recife e região metropolitana.' });
    this.meta.updateTag({ property: 'og:title', content: 'Containers para Locação e Venda | Bravo Equipamentos' });
    this.meta.updateTag({ property: 'og:description', content: 'Catálogo completo de containers para locação e venda em Recife, PE.' });
    this.meta.updateTag({ property: 'og:url',   content: 'https://bravoequipamentos.com/containers' });
    this.meta.updateTag({ property: 'og:image', content: 'https://bravoequipamentos.com/images/BR-stand-de-vendas.webp' });

    this.destroyRef.onDestroy(() => {
      this.lgInstance?.destroy();
      this.lgInstance = null;
    });
  }

  readonly Check = Check;
  readonly Zap = Zap;
  readonly Wrench = Wrench;

  readonly containers: Container[] = CONTAINERS;

  getInteriorPhoto(container: Container): string | null {
    return container.photos.find(p => p.includes('interior')) ?? null;
  }
}
