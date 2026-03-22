import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta  = inject(Meta);

  override updateTitle(state: RouterStateSnapshot): void {
    const route = this.findDeepestRoute(state.root);
    const title = this.buildTitle(state);

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ property: 'og:title', content: title });
    }

    const description: string | undefined = route?.data?.['description'];
    if (description) {
      this.meta.updateTag({ name: 'description',       content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    const ogUrl: string | undefined = route?.data?.['ogUrl'];
    if (ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: ogUrl });
    }
  }

  private findDeepestRoute(route: RouterStateSnapshot['root']): RouterStateSnapshot['root'] | null {
    let current: RouterStateSnapshot['root'] | null = route;
    while (current?.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
