import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  mostrar = false;
  ocultar = 'inactive';

  constructor() {}

  ngOnInit(): void {}

  ocultarMenu(value: boolean) {
    this.mostrar = value;
    this.mostrar === false ? (this.ocultar = 'inactive') : (this.ocultar = '');
  }
}
