import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themes = [
    {
      id: 'lara-light-blue',
      label: 'Lara Light Blue'
    },
    {
      id: 'bootstrap4-dark-blue',
      label: 'Bootstrap 4 Dark Blue'
    }
  ];

  selectedTheme: { id : string, label: string } = this.themes[0];

  constructor(private themeService: ThemeService) {}


  changeTheme(id: string) {
     this.themeService.switchTheme(id);
  }
}
