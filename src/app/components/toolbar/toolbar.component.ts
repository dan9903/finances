import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  rangeDates: Date[] = [];
  sidebarMenuVisible = false;

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.rangeDates.push(new Date());
    this.rangeDates.push(new Date());
    this.rangeDates[0].setMonth(this.rangeDates[0].getMonth() - 1);
  }

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }

  active(path: string): boolean {
    return this.router.isActive(path, true);
  }

  toggleSidebar(): void {
    this.sidebarMenuVisible = !this.sidebarMenuVisible;
  }
}
