import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { THEMES } from 'src/app/constants/themes';
import ITheme from 'src/app/interfaces/ITheme';
import { ThemeService } from 'src/app/services/misc/theme.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html'
})
export class MenuSidebarComponent implements OnChanges {
  @Input({ required: true })
  sidebarVisible: boolean = false;

  @Output()
  sidebarVisibleChange = new EventEmitter<boolean>();

  themes = THEMES;
  selectedTheme!: ITheme;


  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: MouseEvent): void {
    this.sidebarChangeValue(false);
    this.sidebarRef.close(e);
  }

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    const themeId = this.themeService.getCurrentTheme();
    const theme = THEMES.find((item: ITheme) => item.id === themeId);
    this.selectedTheme = theme ? theme : THEMES[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sidebarVisible']?.currentValue) {
      this.sidebarVisible = changes['sidebarVisible']?.currentValue;
    }
  }

  sidebarChangeValue(value: boolean): void {
    this.sidebarVisible = value;
    this.sidebarVisibleChange.emit(value);
  }

  changeTheme(id: string) {
    this.themeService.switchTheme(id);
  }
}
