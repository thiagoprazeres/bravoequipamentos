import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  afterNextRender,
  input,
} from '@angular/core';
import gsap from 'gsap';

/**
 * High-ticket GSAP logo reveal — "The Signature"
 *
 * Phase 1  (0.0 → 1.1s)  navy mask wipes off RIGHT  → logo revealed L→R
 * Phase 2  (0.45 → 1.05s) golden shimmer sweeps across the logo surface
 * Phase 3  (0.75 → 1.2s)  1.5 px gold accent line draws from left
 */
@Component({
  selector: 'app-logo-anim',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block' },
  template: `
    <div class="relative inline-block overflow-hidden" #wrap>

      <img
        src="logos/logo-fundo_branco.svg"
        alt="BRAVO EQUIPAMENTOS"
        width="200"
        height="57"
        [style.height]="height()"
        class="block w-auto select-none"
        loading="eager"
        draggable="false">

      <!-- Mask: same colour as hero bg, wipes off to the right -->
      <div
        #mask
        class="absolute inset-0 pointer-events-none"
        [style.background]="bg()"
        aria-hidden="true"></div>

      <!-- Shimmer: diagonal gold gradient that sweeps across -->
      <div
        #shimmer
        class="absolute inset-0 pointer-events-none"
        style="background: linear-gradient(105deg, transparent 15%, rgba(254,206,16,.55) 50%, transparent 85%); opacity: 0;"
        aria-hidden="true"></div>

      <!-- Accent line: 1.5 px gold rule that draws in below the logo -->
      <div
        #line
        class="absolute left-0 right-0 bottom-0 pointer-events-none"
        style="height: 1.5px; background: #FECE10; transform: scaleX(0); transform-origin: left center;"
        aria-hidden="true"></div>

    </div>
  `,
})
export class LogoAnimComponent {
  /** CSS height value passed to the <img> tag, e.g. "3.5rem" */
  readonly height = input('3.5rem');
  /** Must match the element's background colour so the mask blends perfectly */
  readonly bg = input('#0B2246');
  /** Initial delay before the animation begins (seconds) */
  readonly delay = input(0.25);

  private readonly maskRef    = viewChild.required<ElementRef<HTMLElement>>('mask');
  private readonly shimmerRef = viewChild.required<ElementRef<HTMLElement>>('shimmer');
  private readonly lineRef    = viewChild.required<ElementRef<HTMLElement>>('line');

  constructor() {
    afterNextRender(() => this.play());
  }

  private play(): void {
    const mask    = this.maskRef().nativeElement;
    const shimmer = this.shimmerRef().nativeElement;
    const line    = this.lineRef().nativeElement;

    gsap.set(shimmer, { autoAlpha: 0 });

    gsap
      .timeline({ delay: this.delay() })

      // ── Phase 1: mask wipe ──────────────────────────────────────────────
      .to(mask, {
        xPercent: 101,
        duration: 1.1,
        ease: 'expo.inOut',
      })

      // ── Phase 2: shimmer sweep (overlaps end of mask wipe) ──────────────
      .fromTo(
        shimmer,
        { x: '-115%', autoAlpha: 1 },
        { x: '215%',  duration: 0.6, ease: 'power1.inOut' },
        '-=0.65',
      )

      // ── Phase 3: gold accent line draws in (overlaps end of shimmer) ────
      .to(line, {
        scaleX: 1,
        duration: 0.45,
        ease: 'power3.out',
      }, '-=0.28')

      // ── Cleanup ─────────────────────────────────────────────────────────
      .set(shimmer, { autoAlpha: 0 })
      .set(mask,    { display: 'none' });
  }
}
