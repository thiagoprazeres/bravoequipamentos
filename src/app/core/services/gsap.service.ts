import { Injectable } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CountUpOptions {
  suffix?: string;
  duration?: number;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class GsapService {

  /**
   * Stagger-reveals a list of elements when the trigger scrolls into view.
   * Remove the CSS `.scroll-in` class from elements you pass here to avoid double-animation.
   */
  staggerReveal(
    items: NodeListOf<HTMLElement> | HTMLElement[],
    trigger: HTMLElement,
    fromVars: gsap.TweenVars = {},
  ): gsap.core.Tween {
    return gsap.from(Array.from(items), {
      opacity: 0,
      y: 44,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.1,
      clearProps: 'all',
      scrollTrigger: {
        trigger,
        start: 'top 82%',
        once: true,
      },
      ...fromVars,
    });
  }

  /**
   * Stagger-reveals items from alternating horizontal offsets (L / R).
   * Use for two-column grids.
   */
  staggerRevealLR(
    leftItems: HTMLElement[],
    rightItems: HTMLElement[],
    trigger: HTMLElement,
  ): void {
    const all = [...leftItems, ...rightItems];
    gsap.from(all, {
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -36 : 36),
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      clearProps: 'all',
      scrollTrigger: { trigger, start: 'top 82%', once: true },
    });
  }

  /**
   * Animates a numeric counter from 0 → end when the element enters the viewport.
   */
  countUp(
    el: HTMLElement,
    end: number,
    { suffix = '', duration = 1.8, delay = 0 }: CountUpOptions = {},
  ): gsap.core.Tween {
    const obj = { n: 0 };
    return gsap.to(obj, {
      n: end,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.n) + suffix;
      },
    });
  }

  /**
   * Applies a scrub-based vertical parallax to an element.
   * speed > 0 → moves up relative to scroll (typical image parallax).
   */
  parallax(el: HTMLElement, speed = 0.2): gsap.core.Tween {
    return gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /**
   * Magnetic hover: button follows cursor within its bounding rect.
   * Call once per element; cleans up automatically on destroy via returned cleanup fn.
   */
  magneticHover(el: HTMLElement, strength = 0.35): () => void {
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * strength;
      const dy   = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }

  /**
   * Clips a heading from bottom → full height when entering viewport.
   * Wrap the heading text in a <span> and pass the wrapper + inner span.
   */
  clipReveal(wrapper: HTMLElement, inner: HTMLElement): gsap.core.Tween {
    wrapper.style.overflow = 'hidden';
    return gsap.from(inner, {
      yPercent: 105,
      opacity: 0,
      duration: 0.85,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 88%',
        once: true,
      },
    });
  }
}
