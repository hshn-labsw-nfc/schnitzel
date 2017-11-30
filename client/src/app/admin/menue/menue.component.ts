import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class AdminMenueComponent implements OnInit {

  public menueItems: Array<string>;
  currentSelection = '';

  @Input() adminToken: string;

  @Output()
  menueLogout: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.menueItems = [];
    this.menueItems.push('Status');
    this.menueItems.push('Konfiguration');
    this.menueItems.push('Orte');
    this.menueItems.push('Rätsel');
    this.menueItems.push('Tags');
    this.currentSelection = 'Status';
  }

  ngOnInit() {
  }

  logout(): void {
    this.menueLogout.emit();
  }
}
