import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PostalRecordFields } from '../../api/models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent /* implements OnInit */ {
  @Input() data: PostalRecordFields[] = [];
  @Output() select = new EventEmitter<PostalRecordFields>();

  displayed = ['country_code','postal_code', 'place_name', 'latitude', 'longitude'];

  ngOnInit(): void {
    window.addEventListener('pin-selected', (e: any) => this.select.emit(e.detail));
  }
}
