import { Component, ChangeDetectionStrategy, input, signal, inject, ElementRef } from '@angular/core';

@Component({
  selector: 'app-before-after-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="relative w-full h-full overflow-hidden select-none bg-gray-100">
      <img [src]="after()" [alt]="afterLabel()" class="absolute inset-0 w-full h-full object-cover" draggable="false" loading="lazy" />
      <img [src]="before()" [alt]="beforeLabel()"
           class="absolute inset-0 w-full h-full object-cover"
           [style.clip-path]="'inset(0 ' + (100 - position()) + '% 0 0)'"
           draggable="false" loading="lazy" />
      <div class="absolute inset-y-0 w-px bg-white shadow-[0_0_6px_rgba(0,0,0,.4)] pointer-events-none"
           [style.left.%]="position()"></div>
      <button type="button"
              class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
              [style.left.%]="position()"
              aria-label="Arrastar para comparar exterior e interior"
              (pointerdown)="startDrag($event)"
              (pointermove)="onMove($event)"
              (pointerup)="stopDrag()">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M6 3L2 9l4 6M12 3l4 6-4 6" stroke="#0B2246" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="absolute bottom-2 left-2 bg-black/55 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full pointer-events-none backdrop-blur-sm">{{ beforeLabel() }}</span>
      <span class="absolute bottom-2 right-2 bg-black/55 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full pointer-events-none backdrop-blur-sm">{{ afterLabel() }}</span>
    </div>
  `,
})
export class BeforeAfterSliderComponent {
  readonly before = input.required<string>();
  readonly after  = input.required<string>();
  readonly beforeLabel = input('Exterior');
  readonly afterLabel  = input('Interior');

  readonly position = signal(50);
  private dragging = false;
  private readonly el = inject(ElementRef<HTMLElement>);

  startDrag(e: PointerEvent): void {
    this.dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  onMove(e: PointerEvent): void {
    if (!this.dragging) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    this.position.set(Math.round((x / rect.width) * 100));
  }

  stopDrag(): void {
    this.dragging = false;
  }
}
