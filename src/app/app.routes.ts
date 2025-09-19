import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapPageComponent } from './components/map-page/map-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapPageComponent },
  { path: '**', redirectTo: '' },
];

export class AppRoutingModule {}
