import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  switchTheme(theme: string ) {
    console.log("cu");
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    console.log(themeLink); 
    if (themeLink) {
      console.log("calling change theme");
      themeLink.href = theme + '.css'; /* bundle name */
    }
  }
}
