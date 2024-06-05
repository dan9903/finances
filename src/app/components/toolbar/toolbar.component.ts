import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THEMES } from 'src/app/constants/themes';
import ITheme from 'src/app/interfaces/ITheme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  rangeDates: Date[] = [];
  themes = THEMES;
  selectedTheme!: ITheme;


  constructor(private themeService: ThemeService, private router: Router) { }


  ngOnInit(): void {
    const themeId = this.themeService.getCurrentTheme();
    const theme = THEMES.find((item: ITheme) => item.id === themeId);
    this.selectedTheme = theme ? theme : THEMES[0];


    this.rangeDates.push(new Date());
    this.rangeDates.push(new Date());
    this.rangeDates[0].setMonth(this.rangeDates[0].getMonth() - 1);
  }

  changeTheme(id: string) {
    this.themeService.switchTheme(id);
  }

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }

  active(path: string): boolean {
    return this.router.isActive(path, true);
  }
}
