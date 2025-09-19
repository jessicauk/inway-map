import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostalStore } from '../../../api/postal.store';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class ButtonComponent {
  constructor(private loc: Location, private router: Router, private store: PostalStore) {}
  goBack() {
    this.store.reset();
    if (history.length > 1) this.loc.back();
    else this.router.navigateByUrl('/'); // criterio: si no hay historial, resetea estado
  }
}
